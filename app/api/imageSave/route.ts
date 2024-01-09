
import db from '@/sqliteDB'
import { Tag } from '@/types'
import { Console } from 'console'



export async function POST(req: Request) {
    const body = await req.json()
    const { name, userId, tags, title, prompt } = body
    console.log(name, userId, tags, title, prompt)

    // await db('images').insert({
    //     title: "yo",
    //     unique_name: "NAME",
    //     user_Id:2,
    //     prompt: "FFDASF"
    // });
    // console.log("done")
    // return NextResponse.json({msg: "YOOO"})
    const tagIds = JSON.parse(tags).map((tag: Tag) => tag.tagid);


    const imageData = {
        title,
        unique_name: name,
        user_Id: userId,
        prompt
    };
    console.log(imageData)

    try {
        console.log("1")
        const imageId = await db('images').insert(imageData);
        console.log(imageId)
        const tagImageRelationships = tagIds.map((tagid:string) => ({ tag_id:tagid, image_id: imageId[0] }));
        console.log(tagImageRelationships)
        const res = await db('tags_images')
            .insert(tagImageRelationships);
        console.log(res, "WTFFF")
        return new Response(JSON.stringify({ mesage: "Image inserted successfully" }), { status: 200 });
    } catch (error) {
        console.log("2")

        return new Response("FAILED", { status: 500 });
    } finally {
        db.destroy();
    }

}