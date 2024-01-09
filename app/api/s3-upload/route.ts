
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

function generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
  
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

async function uploadFileToS3(file:Buffer, fileName:string) {
    console.log(file, fileName)

    const randomString = generateRandomString();
    const randomfilename = `images/${fileName}-${randomString}`
    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: randomfilename,
        Body: file,
        ContentType: "image/jpg"
    }

    const command = new PutObjectCommand(params);
    await s3Client.send(command)
    return randomfilename
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