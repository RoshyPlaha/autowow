import { SchedulerClient, CreateScheduleCommand } from "@aws-sdk/client-scheduler";
import { getAWSConfig } from "../config/aws-config";

export const scheduleCapsule = async (email: string, fileName: string, expirationDate: string, shareableEmailList: string[]) => {

    const awsConfig = await getAWSConfig();
    const client = new SchedulerClient(awsConfig);

    try {
        const command = new CreateScheduleCommand({
            Name: fileName, // Unique name for the schedule
            ScheduleExpression: `at(${expirationDate.split('.')[0]})`, // Remove milliseconds and add quotes
            FlexibleTimeWindow: {
                Mode: "OFF"
            },
            Target: {
                Arn: awsConfig.lambdaFunctionArn, // ARN of your Lambda function
                RoleArn: awsConfig.role_arn, // IAM role for EventBridge
                Input: JSON.stringify({
                    email,
                    fileName,
                    expirationDate,
                    shareableEmailList
                })
            },
            State: "ENABLED"
        });

        const response = await client.send(command);
        console.log("Schedule created:", response);
        return response;
    } catch (error) {
        console.error("Error creating schedule:", error);
        throw error;
    }
};