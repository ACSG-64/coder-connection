import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const token = req.nextauth.token

        // When the user is unauthenticated
        if (req.nextUrl.pathname.startsWith('/app') && !token) {
            return NextResponse.redirect(new URL('/', req.url))
        }

        // When the user is authenticated
        if (req.nextUrl.pathname.startsWith('/app') && !!token) {
            // If the user is not yet a full member
            if (
                !req.nextUrl.pathname.startsWith('/app/account/setup') &&
                !token.isMember
            ) {
                return NextResponse.redirect(
                    new URL('/app/account/setup', req.url)
                )
            }
            // If the user is already a full member but tries to setup the account again
            else if (
                req.nextUrl.pathname.startsWith('/app/account/setup') &&
                token.isMember
            ) {
                return NextResponse.redirect(new URL('/app', req.url))
            }
        }
    },
    {
        callbacks: {
            authorized: () => true // this to allow this middleware to always execute
        }
    }
)

export const config = {
    matcher: ['/((?!_next).*)'] // Apply to all routes
}
