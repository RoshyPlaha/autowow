import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { encryptPassword } from "./encryption";
import { getAWSConfig } from "../config/aws-config";

export const createUser = async (
  email: string,
  password: string,
  capsuleDetails: any
) => {
  const awsConfig = await getAWSConfig();
  const dynamoClient = new DynamoDBClient(awsConfig);
  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  const putParams = {
    TableName: "users",
    Item: {
      email_id: email,
      password: encryptPassword(password),
      capsules: [capsuleDetails], // Store as array
    },
  };

  try {
    await docClient.send(new PutCommand(putParams));
    console.log("User entry created in DynamoDB");
  } catch (error) {
    console.error("Error creating user in database:", error);
    throw error;
  }
};

export const addCapsule = async (email: string, capsuleDetails: any) => {
  const awsConfig = await getAWSConfig();
  const dynamoClient = new DynamoDBClient(awsConfig);
  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  const updateParams = {
    TableName: "users",
    Key: { email_id: email },
    UpdateExpression:
      "SET capsules = list_append(if_not_exists(capsules, :empty_list), :capsule)",
    ExpressionAttributeValues: {
      ":capsule": [capsuleDetails],
      ":empty_list": [],
    },
  };

  try {
    await docClient.send(new UpdateCommand(updateParams));
    console.log("Capsule added to user's capsules array");
  } catch (error) {
    console.error("Error adding capsule to database:", error);
    throw error;
  }
};

export const updateCapsule = async (email: string, fileName: string, capsuleDetails: any) => {
  const awsConfig = await getAWSConfig();
  const dynamoClient = new DynamoDBClient(awsConfig);
  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  try {
    // First get the current capsules array
    const capsules = await getCapsules(email);
    
    // Find the index of the capsule with matching fileName
    const capsuleIndex = capsules.findIndex((capsule: any) => capsule.fileName === fileName);

    console.log("capsuleIndex is", capsuleIndex);

    if (capsuleIndex === -1) {
      throw new Error("Capsule not found");
    }

    const updateParams = {
      TableName: "users",
      Key: { email_id: email },
      UpdateExpression: `SET #capsules[${capsuleIndex}] = :updatedCapsule`,
      ExpressionAttributeNames: {
        "#capsules": "capsules"
      },
      ExpressionAttributeValues: {
        ":updatedCapsule": { ...capsuleDetails, isPaid: true }
      }
    };

    await docClient.send(new UpdateCommand(updateParams));
    console.log("Capsule updated successfully");
  } catch (error) {
    console.error("Error updating capsule in database:", error);
    throw error;
  }
};

export const getCapsules = async (email: string) => {
  const awsConfig = await getAWSConfig();
  const dynamoClient = new DynamoDBClient(awsConfig);
  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  const getParams = {
    TableName: "users",
    Key: { email_id: email },
  };

  try {
    const result = await docClient.send(new GetCommand(getParams));
    return result.Item?.capsules || []; // Return empty array if no capsules exist
  } catch (error) {
    console.error("Error fetching capsules from database:", error);
    throw error;
  }
};

export const getCapsuleFileName = async (email: string, fileName: string) => {
  const capsules = await getCapsules(email);
  return capsules.find((capsule: any) => capsule.fileName === fileName);
};

export const getBlogContent = async (slug: string) => {

  const awsConfig = await getAWSConfig();
  const dynamoClient = new DynamoDBClient(awsConfig);
  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  const getParams = {
    TableName: "content",
    Key: { slug: slug },
  };

  const result = await docClient.send(new GetCommand(getParams));

  if(!result.Item) {
    throw new Error(`Content not found for slug: ${slug}`);
  }

  return result.Item;
};
