// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

let isSecretGet: boolean = false;
let jsonSecret: {
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    BUCKET_NAME: string,
} = {
    AWS_ACCESS_KEY_ID: "",
    AWS_SECRET_ACCESS_KEY: "",
    BUCKET_NAME: "",
};

const getSecret: () => Promise<{
    AWS_ACCESS_KEY_ID: string,
    AWS_SECRET_ACCESS_KEY: string,
    BUCKET_NAME: string,
}> = async () => {
    console.log('getSecret run');
    try {
        if (!isSecretGet) {
            return jsonSecret;
        }
        let response;
        const secret_name = "upload-image-to-s3-secrets";
        const client = new SecretsManagerClient({
            region: "us-east-1",
        });
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
        console.log('response getSecret', response);

        const secretString = response.SecretString;
        jsonSecret = JSON.parse(secretString as string);
        isSecretGet = true;
        console.log('getSecret return');
        return jsonSecret;
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.log('getSecret error', error);
        throw error;
    }
}

export { getSecret };
