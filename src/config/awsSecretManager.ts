// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "upload-image-to-s3-secrets";

const client = new SecretsManagerClient({
    region: "us-east-1",
});

let jsonSecret: {
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    BUCKET_NAME: string,
} = {
    AWS_ACCESS_KEY_ID: "",
    AWS_SECRET_ACCESS_KEY: "",
    BUCKET_NAME: "",
};
const getSecret = async () => {
    console.log('getSecret run')
    let response;
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );

        const secretString = response.SecretString;
        jsonSecret = JSON.parse(secretString as string);
        console.log('getSecret return')
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }
}

getSecret();

export { jsonSecret };
