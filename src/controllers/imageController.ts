import { Request, Response } from 'express';
import { s3, jsonSecret } from '../config/awsConfig';

import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
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

    return res.send({ resolvedUrls });
}