import { MDXRemote } from 'next-mdx-remote/rsc'

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
    return <MDXRemote source={markdown} />
}
