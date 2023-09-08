import { Paragraph } from './ui/typography'
import Image from 'next/image'

export default function SiteIcon() {
    return (
        <div className="flex flex-row-reverse items-center justify-end gap-2 px-2">
            <Paragraph className="m-0 p-0 font-extrabold">
                CoderConnection
            </Paragraph>
            <Image
                className="drop-shadow"
                src="/src/images/logo.png"
                alt="Logo"
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
            />
        </div>
    )
}
