import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";

const sendEmail = async (
  recipientEmail: string,
  filename: string,
  downloadUrl: string,
  sesClient: SESClient
) => {
  await sesClient.send(
    new SendEmailCommand({
      Destination: {
        ToAddresses: [recipientEmail],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <html>
                <body>
                  <h2>Your Capsule is Ready!</h2>
                  <p>Hello!</p>
                  <p>Your capsule "${filename}" is now available for download.</p>
                  <p>You can download it using this link: <a href="${downloadUrl}">Download Your Capsule</a></p>
                  <p>This link will be available for the next 24 hours.</p>
                  <p>Thank you for using Capsules!</p>
                </body>
              </html>
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Times. Moved. Fast. Your Capsule is Ready for Download",
        },
      },
      Source: "mail@capsules.today",
    })
  );
};

// Function to copy object to public bucket
const copyToPublicBucket = async (
  fileName: string,
  privateBucket: string,
  publicBucket: string
) => {
  const s3Client = new S3Client({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  try {
    // Determine content type based on file extension
    const getContentType = (filename: string) => {
      const ext = filename.toLowerCase().split(".").pop();
      return "video/mp4";
    };

    // Copy object from private bucket to public bucket with proper headers
    const copyCommand = new CopyObjectCommand({
      Bucket: publicBucket,
      CopySource: `${privateBucket}/${fileName}`,
      Key: fileName,
      // Set proper content type and headers for cross-device compatibility
      ContentType: getContentType(fileName),
      MetadataDirective: "REPLACE",
      CacheControl: "public, max-age=86400", // Cache for 24 hours
    });

    await s3Client.send(copyCommand);
    console.log(`Copied ${fileName} to public bucket`);

    // Return the public URL
    return `https://${publicBucket}.s3.eu-west-2.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error(`Error copying ${fileName} to public bucket:`, error);
    throw error;
  }
};

// Function to get capsules expiring today
const getCapsulesForToday = async () => {
  const dynamoClient = new DynamoDBClient({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  console.log(`Looking for capsules expiring on: ${today}`);

  try {
    // Scan all users to find capsules expiring today
    const scanParams = {
      TableName: "users",
    };

    const result = await docClient.send(new ScanCommand(scanParams));

    if (!result.Items) {
      console.log("No users found in the table");
      return [];
    }

    const expiringCapsules: Array<{
      email: string;
      fileName: string;
      prettyFileName?: string;
      expirationDate: string;
    }> = [];

    // Process each user
    result.Items.forEach((user) => {
      if (user.capsules && Array.isArray(user.capsules)) {
        user.capsules.forEach((capsule: any) => {
          // Check if the capsule has an expiration date
          if (capsule.expirationDate) {
            const expirationDate = new Date(capsule.expirationDate)
              .toISOString()
              .split("T")[0];

            // Check if expiration date is today
            if (expirationDate === today) {
              expiringCapsules.push({
                email: capsule.email || user.email,
                fileName: capsule.fileName,
                prettyFileName: capsule.prettyFileName,
                expirationDate: capsule.expirationDate,
              });
            }
          }
        });
      }
    });

    console.log(`Found ${expiringCapsules.length} capsules expiring today:`);
    expiringCapsules.forEach((capsule) => {
      console.log(
        `- ${capsule.prettyFileName || capsule.fileName} (${capsule.email})`
      );
    });

    return expiringCapsules;
  } catch (error) {
    console.error("Error scanning users table:", error);
    throw error;
  }
};

const sendCustomerVideo = async () => {
  const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set");
  }

  try {
    // Get capsules expiring today
    const expiringCapsules = await getCapsulesForToday();

    if (expiringCapsules.length === 0) {
      console.log("No capsules expiring today");
      return;
    }

    const sesClient = new SESClient({
      region: "eu-west-2",
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });

    // Process each expiring capsule
    for (const capsule of expiringCapsules) {
      try {
        // Copy object to public bucket for download
        const downloadUrl = await copyToPublicBucket(
          capsule.fileName,
          "capsule-video-storage",
          "public-capsule-video-storage"
        );

        console.log(downloadUrl);
        // Send email with download link
        await sendEmail(
          capsule.email,
          capsule.prettyFileName || capsule.fileName,
          downloadUrl,
          sesClient
        );

        console.log(
          `Email sent successfully to ${capsule.email} for ${
            capsule.prettyFileName || capsule.fileName
          }`
        );
        console.log(`Download URL: ${downloadUrl}`);
      } catch (error) {
        console.error(`Error processing capsule for ${capsule.email}:`, error);
      }
    }
  } catch (error) {
    console.error("Error in sendCustomerVideo:", error);
  }
};

// Daily script
sendCustomerVideo();
