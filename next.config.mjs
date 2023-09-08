import remarkGfm from 'remark-gfm'
import remarkRemoveComments from 'remark-remove-comments'
import rehypePrettyCode from 'rehype-pretty-code'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
        mdxRs: true
    }
}

const withMDX = createMDX({
    options: {
        providerImportSource: '@mdx-js/react',
        format: 'md',
        remarkPlugins: [remarkGfm, remarkRemoveComments],
        rehypePlugins: [rehypePrettyCode]
    }
})

export default withMDX(nextConfig)
