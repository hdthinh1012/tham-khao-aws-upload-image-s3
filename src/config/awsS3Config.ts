import { S3Client } from '@aws-sdk/client-s3';
import dotenv from "dotenv";
import { jsonSecret } from "./awsSecretManager";

dotenv.config();

// export let jsonSecret = {
//     AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
//     AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
//     BUCKET_NAME: process.env.BUCKET_NAME,
// };

export const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: jsonSecret.AWS_ACCESS_KEY_ID ? jsonSecret.AWS_ACCESS_KEY_ID : "",
        secretAccessKey: jsonSecret.AWS_SECRET_ACCESS_KEY ? jsonSecret.AWS_SECRET_ACCESS_KEY : ""
    }
});
