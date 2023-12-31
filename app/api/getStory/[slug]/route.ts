
import db from '@/sqliteDB'
import { Blog } from '@/types'

export async function GET(req: Request, {params}:{params:{slug:string}}) {
	console.log("WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", params)
	console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

    try {
		const blog:Blog = await db("blogs").where('slug', params.slug).first();
        return new Response(JSON.stringify({ mesage: "Success", data:blog }), { status: 200 });
	} catch(error) {
		console.log(error)
		return new Response("Failed to fetch Story", { status: 500 });
	}

}