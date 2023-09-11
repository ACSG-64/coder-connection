'use client'
import './gh-md.css'

export default function MarkdownContainer({
    children
}: {
    children: React.ReactNode
}) {
    return <div className="markdown-body"> {children}</div>
}
