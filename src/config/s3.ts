import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const BUCKET = process.env.AWS_BUCKET_NAME!;

async function getPresignedUrl(key: string): Promise<string> {
    return getSignedUrl(s3, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn: 3600 });
}

export async function getMusicURLs() {
    return {
        CT: await getPresignedUrl("media/music/CT.mp3"),
        DQ: await getPresignedUrl("media/music/DQ.mp3"),
        KQ: await getPresignedUrl("media/music/KQ.mp3"),
        NC: await getPresignedUrl("media/music/NC.mp3"),
    };
}

export async function getStyleURLs() {
    return {
        main: await getPresignedUrl("media/stylesheets/main.css"),
    };
}