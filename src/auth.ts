import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from './auth.config';

// Your own logic for dealing with plaintext password strings; be careful!
//import { saltAndHashPassword } from "@/utils/password"
import { getUserLogin } from "@/lib/userAction"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "jwt" },
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    ...authConfig,
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            name: "Credentials",

            credentials: {
                user: { type: "text", placeholder: "Username" },
                password: { type: "password", placeholder: "Password" },
            },
            authorize: async (credentials) => {

                let user = null
                const { username, password } = credentials as {
                    username: string
                    password: string
                };
                // logic to salt and hash password
                //const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                user = await getUserLogin(username, password)
                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user = token.user as any;
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },

})
