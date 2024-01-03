
import db from '@/sqliteDB'
import { Blog } from '@/types'

export async function GET(req: Request) {

	try {
		const blogsWithTags = await db
			.select('blogs.*', db.raw('GROUP_CONCAT(tags.name) as tag_names'))
			.from('blogs')
			.leftJoin('tags_blogs', 'blogs.id', 'tags_blogs.id')
			.leftJoin('tags', 'tags_blogs.tagid', 'tags.tagid')
			.groupBy('blogs.id');
		// console.log(blogsWithTags)
		// const blogs: Blog[] = await db("blogs").select("*");
		return new Response(JSON.stringify({ mesage: "Success", data: blogsWithTags }), { status: 200 });
	} catch (error) {
		console.log(error)
		return new Response("Failed to fetch Stories", { status: 500 });
	}

}