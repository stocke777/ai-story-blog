
import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// @ts-ignore
const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY
    }
})

async function uploadFileToS3(file:Buffer, fileName:string) {
    console.log(file, fileName)

    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: `images/${fileName}-${Date.now()}`,
        Body: file,
        ContentType: "image/jpg"
    }

    const command = new PutObjectCommand(params);
    await s3Client.send(command)
    return fileName
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        console.log(formData)
        const file = formData.get('file') as File

        if(!file){
            return NextResponse.json({error: "File is required!"}, {status: 400})
        }

        console.log(file)
        const buffer = Buffer.from(await file.arrayBuffer());
        console.log(buffer)
        const fileName = await uploadFileToS3(buffer, file.name)

        return NextResponse.json({success:true, fileName:fileName}, {status:200})
    } catch (error) {
        return NextResponse.json({ error: "Error uploading!" })

    }

}