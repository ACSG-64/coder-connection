import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'preferences'
export async function POST(req: NextRequest) {
    console.log()
    // Get the language
    const body = await req.json()
    const lang = body.lang
    if (!lang) return new NextResponse('Bad formatted', { status: 401 })

    const preferencesCookie = req.cookies.get(COOKIE_NAME)

    let updatedCookieContent = ''
    if (!preferencesCookie) {
        updatedCookieContent = JSON.stringify({ lang })
    } else {
        try {
            const currentCookieContent = JSON.parse(preferencesCookie.value)
            updatedCookieContent = JSON.stringify({
                ...currentCookieContent,
                lang
            })
        } catch (e) {
            updatedCookieContent = JSON.stringify({ lang })
        }
    }

    return new NextResponse('Language changed', {
        status: 200,
        headers: {
            'Set-Cookie': `${COOKIE_NAME}=${updatedCookieContent}; Path=/; Expires=Wed, 21 Oct 2023 07:28:00 GMT`
        }
    })
}
