import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


const sendEmail = async (recipientEmail: string, filename: string, sesClient: SESClient) => {
 
    sesClient.send(
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
                  <h2>Your Video Has Been Uploaded</h2>
                  <p>Hello!</p>
                  <p>Your video "${filename}" has been successfully uploaded to our system.</p>
                  <p>You can access your video through our platform once processing is complete.</p>
                  <p>Thank you for using our service!</p>
                </body>
              </html>
            `,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Video Upload Confirmation",
          },
        },
        Source: "mail@capsules.today",
      })
    );
  };

const testSendEmail = async () => {

    const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

    if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
      throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set");
    }

  try {
    const sesClient = new SESClient({
      region: "eu-west-2",
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
      }
    });

    await sendEmail("roshsplaha@gmail.com", "test.mp4", sesClient);
    console.log("Email sent successfully");

  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

// Run the test
testSendEmail(); 