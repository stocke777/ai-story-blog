import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import db from '@/sqliteDB'
import { profile } from "console";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const user = await db('users').where({ username: req.body.username, password: req.body.password }).first();
                    // const query = db('users').where({ username: req.body.username, password: req.body.password }).first();
                    // console.log('Query:', query.toString());
                    console.log(user)
                    return user;
                } catch (error) {
                    console.error('Error authenticating user:', error);
                    return false
                }
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

                // If no error and we have user data, return it
                // Return null if user data could not be retrieved
                return false
            }
        })
    ],
    session: {
        jwt: true,
        maxAge: 30,
    },
    callbacks: {
        async jwt(token) {
            console.log(token)
            const {token:jwtToken} = token
            const {user, account} = jwtToken
            console.log("WTFFFFFFFFFFFFFFFFF", jwtToken, user, account)
            return token;
        },

        async session({session, token}) {
            const user = token?.token?.user
            console.log("WTFFFFFFFFFFFFFFFFF", session, token)

            session.user = user || null

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }