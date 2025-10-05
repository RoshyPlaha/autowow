import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

interface AWSConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  bucketName: string;
  lambdaFunctionArn: string;
  role_arn: string;
}

export const getAWSConfig = async (): Promise<AWSConfig> => {
  // Verify all required environment variables are present
  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error("AWS_ACCESS_KEY_ID is not defined");
  }
  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS_SECRET_ACCESS_KEY is not defined");
  }
  if (!process.env.AWS_REGION) {
    throw new Error("AWS_REGION is not defined");
  }
  if (!process.env.AWS_BUCKET_NAME) {
    throw new Error("AWS_BUCKET_NAME is not defined");
  }
  if (!process.env.AWS_LAMBDA_FUNCTION_ARN) {
    throw new Error("LAMBDA_FUNCTION_ARN is not defined");
  }
  if (!process.env.AWS_ROLE_ARN) {
    throw new Error("AWS_ROLE_ARN is not defined");
  }

  const stsClient = new STSClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  try {
    const command = new AssumeRoleCommand({
      RoleArn: process.env.AWS_ROLE_ARN,
      RoleSessionName: "CapsuleAppSession",
      DurationSeconds: 3600, // 1 hour
    });

    const response = await stsClient.send(command);

    if (!response.Credentials) {
      throw new Error("Failed to get credentials");
    }

    return {
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
      bucketName: process.env.AWS_BUCKET_NAME!,
      lambdaFunctionArn: process.env.AWS_LAMBDA_FUNCTION_ARN!,
      role_arn: process.env.AWS_ROLE_ARN!,
    };
  } catch (error) {
    console.error("Error assuming role:", error);
    throw error;
  }
};
