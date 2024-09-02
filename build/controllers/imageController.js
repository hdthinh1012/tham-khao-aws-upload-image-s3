"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = exports.getAllImages = void 0;
const awsS3Config_1 = require("../config/awsS3Config");
const awsSecretManager_1 = require("../config/awsSecretManager");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const getAllImages = async (req, res) => {
    var _a;
    const listObjectRequests = new client_s3_1.ListObjectsV2Command({
        Bucket: awsSecretManager_1.jsonSecret.BUCKET_NAME ? awsSecretManager_1.jsonSecret.BUCKET_NAME : "",
        Prefix: "images/"
    });
    const data = await (awsS3Config_1.s3 === null || awsS3Config_1.s3 === void 0 ? void 0 : awsS3Config_1.s3.send(listObjectRequests));
    const urls = (_a = data.Contents) === null || _a === void 0 ? void 0 : _a.map(async (item) => {
        var _a;
        const getObjectCommand = new client_s3_1.GetObjectCommand({
            Bucket: awsSecretManager_1.jsonSecret.BUCKET_NAME,
            Key: item.Key,
            ResponseContentDisposition: "inline",
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(awsS3Config_1.s3, getObjectCommand, { expiresIn: 3600 });
        return {
            url,
            fileName: (_a = item.Key) === null || _a === void 0 ? void 0 : _a.split("/")[1],
        };
    });
    let resolvedUrls;
    if (urls) {
        resolvedUrls = await Promise.all(urls);
    }
    return res.send({ resolvedUrls: resolvedUrls, aaaa: '' });
};
exports.getAllImages = getAllImages;
const uploadImage = async (req, res) => {
    const file = req.file;
    const fileName = Date.now() + "_" + (file === null || file === void 0 ? void 0 : file.originalname);
    const fileContent = file === null || file === void 0 ? void 0 : file.buffer;
    const contentLength = file === null || file === void 0 ? void 0 : file.size;
    const putObjectRequest = new client_s3_1.PutObjectCommand({
        Bucket: awsSecretManager_1.jsonSecret.BUCKET_NAME ? awsSecretManager_1.jsonSecret.BUCKET_NAME : "",
        Key: `images/${fileName}`,
        Body: fileContent,
        ContentType: file === null || file === void 0 ? void 0 : file.mimetype,
        ContentLength: contentLength,
    });
    try {
        const data = await awsS3Config_1.s3.send(putObjectRequest);
        res.json({ data });
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
exports.uploadImage = uploadImage;
const deleteImage = async (req, res) => {
    const { fileName } = req.params;
    const deleteObjectRequest = new client_s3_1.DeleteObjectCommand({
        Bucket: awsSecretManager_1.jsonSecret.BUCKET_NAME ? awsSecretManager_1.jsonSecret.BUCKET_NAME : "",
        Key: `images/${fileName}`,
    });
    try {
        const data = await awsS3Config_1.s3.send(deleteObjectRequest);
        res.json({ data });
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
exports.deleteImage = deleteImage;
