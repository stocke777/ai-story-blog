
import db from '@/sqliteDB'
import { Blog } from '@/types'

export async function GET(req: Request) {

    try {
		const blogs:Blog[] = await db("blogs").select("*");
        return new Response(JSON.stringify({ mesage: "Success", data:blogs }), { status: 200 });
	} catch(error) {
		console.log(error)
		return new Response("Failed to fetch Stories", { status: 500 });
	}

}