import MarkdownContainer from './markdown-container'
import MarkdownRenderer from './markdown-renderer'

interface Props {
    markdown: string
}

export default function Markdown({ markdown }: Props) {
    return (
        <MarkdownContainer>
            <MarkdownRenderer markdown={markdown} />
        </MarkdownContainer>
    )
}
