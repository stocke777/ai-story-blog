
import db from '@/sqliteDB'
import { Blog } from '@/types'
import slugify from 'slugify';


export async function POST(req: Request) {
    const body = await req.json()
    const { title, content, userId, summary } = body
    console.log(body)
    const slug = slugify(title, { lower: true });
    const blogData: Partial<Blog> = {
        title,
        body: content,
        userId,
        summary,
        slug
    };

    console.log(blogData)



    try {
        const result = await db('blogs').insert(blogData);
        console.log('Blog inserted successfully:', result);
        return new Response(JSON.stringify({ mesage: "Blog inserted successfully" }), { status: 200 });
    } catch (error) {
        return new Response("FAILED", { status: 500 });
    } finally {
        // Close the database connection if needed
        db.destroy();
    }

}