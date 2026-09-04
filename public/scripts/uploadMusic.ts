import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { config } from "dotenv";

config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const bucketName = process.env.AWS_BUCKET_NAME!;

const uploadMusic = [
    { path: path.join(__dirname, "../../public/music/CT.mp3") },
    { path: path.join(__dirname, "../../public/music/DQ.mp3") },
    { path: path.join(__dirname, "../../public/music/KQ.mp3") },
    { path: path.join(__dirname, "../../public/music/NC.mp3") },
];

async function uploadFile() {
    for (const file of uploadMusic) {
        const fileContent = fs.readFileSync(file.path);
        const fileName = path.basename(file.path);

        await s3.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: `media/music/${fileName}`,
            Body: fileContent,
            ContentType: "audio/mpeg",
        }));

        console.log(`✅ Archivo ${fileName} subido exitosamente.`);
    }
}

uploadFile();