
import db from '@/sqliteDB'

export async function GET(req: Request) {

    try {
		const tags = await db("tags")
        return new Response(JSON.stringify({ mesage: "Success", data:tags }), { status: 200 });
	} catch(error) {
		console.log(error)
		return new Response("Failed to fetch tags", { status: 500 });
	}

}