"use strict";
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSecret = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const secret_name = "upload-image-to-s3-secrets";
const client = new client_secrets_manager_1.SecretsManagerClient({
    region: "us-east-1",
});
let jsonSecret = {
    AWS_ACCESS_KEY_ID: "",
    AWS_SECRET_ACCESS_KEY: "",
    BUCKET_NAME: "",
};
exports.jsonSecret = jsonSecret;
const getSecret = async () => {
    let response;
    try {
        response = await client.send(new client_secrets_manager_1.GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        }));
        const secretString = response.SecretString;
        exports.jsonSecret = jsonSecret = JSON.parse(secretString);
    }
    catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }
};
getSecret();
