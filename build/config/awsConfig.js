"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = exports.jsonSecret = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.jsonSecret = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
};
exports.s3 = new client_s3_1.S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: exports.jsonSecret.AWS_ACCESS_KEY_ID ? exports.jsonSecret.AWS_ACCESS_KEY_ID : "",
        secretAccessKey: exports.jsonSecret.AWS_SECRET_ACCESS_KEY ? exports.jsonSecret.AWS_SECRET_ACCESS_KEY : ""
    }
});
