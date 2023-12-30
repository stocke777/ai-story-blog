
import db from '@/sqliteDB'
export async function POST(req: Request) {
    const body = await req.json()
    const { username, password } = body

    const newUser = {
        username,
        password
    };

    try {
        const result = await db('users')
            .insert(newUser)
            .returning(['id', 'username']); // Specify the columns you want to return

        const insertedUser = result[0];
        console.log('Inserted user:', insertedUser);

        // Return a success response
        return new Response(JSON.stringify({ mesage: "Success" }), { status: 200 });
    } catch (error) {
        console.error('Error inserting user:', error);

        // Return an error response
        return new Response("FAILED", { status: 500 });
    } finally {
        db.destroy(); // Close the database connection
    }

}