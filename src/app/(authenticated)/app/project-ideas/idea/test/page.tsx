import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function Test() {
    const rawRes = await fetch(
        'https://api.github.com/repos/octokit/core.js/readme'
    )
    const res = await rawRes.json()
    const contentBase64 = res.content
    const content = Buffer.from(contentBase64, 'base64').toString('utf-8')

    const md = `
    # This is a test

    Would this **work?**
    `
    return <MDXRemote source={md} />
}
