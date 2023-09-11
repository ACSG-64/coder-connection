import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'CoderConnection',
    description: 'A place where developers meet'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                {process.env.ENV === 'production' && (
                    <Script
                        id="clarity-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "ihc12l95zc");`
                        }}
                    />
                )}
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
