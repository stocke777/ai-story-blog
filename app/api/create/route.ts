
import db from '@/sqliteDB'
import { Blog, Tag } from '@/types'
import slugify from 'slugify';


export async function POST(req: Request) {
    const body = await req.json()
    const { title, content, userId, summary, tags } = body
    
    const tagIds = JSON.parse(tags).map((tag: Tag) => tag.tagid);

    const slug = slugify(title, { lower: true });

    const blogData: Partial<Blog> = {
        title,
        body: content,
        userId,
        summary,
        slug
    };

    try {
        const blogId = await db('blogs').insert(blogData);

        const tagBlogRelationships = tagIds.map(tagid => ({ tagid, id: blogId[0] }));

        const res = await db('tags_blogs')
            .insert(tagBlogRelationships);

        return new Response(JSON.stringify({ mesage: "Blog inserted successfully" }), { status: 200 });
    } catch (error) {
        return new Response("FAILED", { status: 500 });
    } finally {
        db.destroy();
    }

}