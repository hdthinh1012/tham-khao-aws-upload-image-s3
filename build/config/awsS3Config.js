"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const awsSecretManager_1 = require("./awsSecretManager");
dotenv_1.default.config();
// export let jsonSecret = {
//     AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
//     AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
//     BUCKET_NAME: process.env.BUCKET_NAME,
// };
let count = 0;
while (awsSecretManager_1.jsonSecret.BUCKET_NAME == "") {
    if (count == 0) {
        console.log("Waiting for secrets");
    }
    count += 1;
    if (count == 2000000000) {
        console.error("AWS Secret loading failed");
        process.exit(1);
    }
}
exports.s3 = new client_s3_1.S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: awsSecretManager_1.jsonSecret.AWS_ACCESS_KEY_ID ? awsSecretManager_1.jsonSecret.AWS_ACCESS_KEY_ID : "",
        secretAccessKey: awsSecretManager_1.jsonSecret.AWS_SECRET_ACCESS_KEY ? awsSecretManager_1.jsonSecret.AWS_SECRET_ACCESS_KEY : ""
    }
});
