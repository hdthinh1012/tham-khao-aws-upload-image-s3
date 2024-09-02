import { S3Client } from '@aws-sdk/client-s3';
import dotenv from "dotenv";
import { getSecret } from "./awsSecretManager";

dotenv.config();

// export let jsonSecret = {
//     AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
//     AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
//     BUCKET_NAME: process.env.BUCKET_NAME,
// };

let isS3Get: boolean = false;
let s3: S3Client = new S3Client();

export const getS3AndSecret = async () => {
    try {
        const jsonSecret = await getSecret();
        if (isS3Get) return { s3, jsonSecret };
        s3 = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: jsonSecret.AWS_ACCESS_KEY_ID ? jsonSecret.AWS_ACCESS_KEY_ID : "",
                secretAccessKey: jsonSecret.AWS_SECRET_ACCESS_KEY ? jsonSecret.AWS_SECRET_ACCESS_KEY : ""
            }
        });
        isS3Get = true;
        return { s3, jsonSecret };
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.log('getS3AndSecret error', error);
        throw error;
    }
}
