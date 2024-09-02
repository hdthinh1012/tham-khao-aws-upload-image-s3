import { Request, Response } from 'express';
import { s3 } from '../config/awsS3Config';
import { jsonSecret } from '../config/awsSecretManager';

import { ListObjectsV2Command, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getAllImages = async (req: Request, res: Response) => {
    const listObjectRequests = new ListObjectsV2Command({
        Bucket: jsonSecret.BUCKET_NAME ? jsonSecret.BUCKET_NAME : "",
        Prefix: "images/"
    });

    const data = await s3?.send(listObjectRequests);
    const urls = data.Contents?.map(async (item) => {
        const getObjectCommand = new GetObjectCommand({
            Bucket: jsonSecret.BUCKET_NAME,
            Key: item.Key,
            ResponseContentDisposition: "inline",
        });
        const url = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });
        return {
            url,
            fileName: item.Key?.split("/")[1],
        };
    });

    let resolvedUrls;
    if (urls) {
        resolvedUrls = await Promise.all(urls);
    }
    return res.send({ resolvedUrls: resolvedUrls, aaaa: '' });
}


export const uploadImage = async (req: Request, res: Response) => {
    const file = req.file;

    const fileName = Date.now() + "_" + file?.originalname;
    const fileContent = file?.buffer;
    const contentLength = file?.size;

    const putObjectRequest = new PutObjectCommand({
        Bucket: jsonSecret.BUCKET_NAME ? jsonSecret.BUCKET_NAME : "",
        Key: `images/${fileName}`,
        Body: fileContent,
        ContentType: file?.mimetype,
        ContentLength: contentLength,
    });

    try {
        const data = await s3.send(putObjectRequest);
        res.json({ data });
    } catch (error) {
        res.status(400).json({ error });
    }
}

export const deleteImage = async (req: Request, res: Response) => {
    const { fileName } = req.params;
    const deleteObjectRequest = new DeleteObjectCommand({
        Bucket: jsonSecret.BUCKET_NAME ? jsonSecret.BUCKET_NAME : "",
        Key: `images/${fileName}`,
    });

    try {
        const data = await s3.send(deleteObjectRequest);
        res.json({ data });
    } catch (error) {
        res.status(400).json({ error });
    }
}