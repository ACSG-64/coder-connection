import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'
import NextAuth from "next-auth"

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            isMember: string
        } & DefaultSession.user
    }

    interface User extends DefaultUser {
        id: string
        isMember: string
        isMember: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: string
        isMember: string
    }
}
