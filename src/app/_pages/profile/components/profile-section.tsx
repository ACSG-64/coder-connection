import { getServerLang } from '@/hooks/use-server-lang'
import { getUserDetails } from '../user-details-data'
import { getDictionary } from '../lang/dictionary'
import { H1, Paragraph, Small } from '@/components/ui/typography'
import { FiClock } from 'react-icons/fi'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import { TagCollectionContainer } from '@/components/tags/tag-collection-container'
import { AnchorButton } from '@/components/ui/button'
import { FaSlack, FaGithub, FaLinkedin } from 'react-icons/fa6'
import Tag from '@/components/tags/tag'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export async function ProfileDetailsSection({
    username
}: {
    username: string
}) {
    const profile = await getUserDetails(username)
    if (!profile) {
        // TODO REDIRECT
        return
    }
    const {
        name,
        surname,
        description,
        competencies,
        interests,
        linkedInUrl,
        username: realUserName,
        timeZone,
        profileImg,
        slackProfileUrl,
        gitHubProfileUrl
    } = profile

    const options = Object.freeze({
        timeZone: timeZone.name.replaceAll(' ', '_'),
        hour: 'numeric',
        minute: 'numeric'
    })
    const formatter = new Intl.DateTimeFormat([], options)
    const currentTime = formatter.format(new Date())
    const currentTimeElement = (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{currentTime}</span>
                </TooltipTrigger>
                <TooltipContent>Current time for this member</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )

    const lang = getServerLang()
    const dict = await getDictionary(lang)
    return (
        <section className="flex gap-5">
            <div className="flex w-full flex-1 flex-col justify-between">
                <div>
                    <header>
                        {/* Member full name */}
                        <H1 className="flex-1 lg:text-4xl">
                            {`${name} ${surname}`}
                        </H1>
                        <Small className="flex gap-2">
                            {/* Member username */}
                            <span aria-label={dict['username-label']}>
                                @{realUserName}
                            </span>
                            {' / '}
                            {/* Member time zone */}
                            <span
                                className="flex gap-1"
                                aria-label={dict['time-zone-label']}
                            >
                                <FiClock />
                                {timeZone.name} - {currentTimeElement}
                            </span>
                        </Small>
                    </header>
                    {/* Member description */}
                    <section className="mb-3 mt-2">
                        <Paragraph>{description}</Paragraph>
                        <section>
                            <strong className="block font-semibold">
                                My competencies
                            </strong>
                            <TagCollectionContainer className="my-1">
                                {competencies.map(({ id, name }) => (
                                    <Tag key={id} id={id} name={name} />
                                ))}
                            </TagCollectionContainer>
                        </section>
                        {/* Member interests & competencies */}
                        <section>
                            <strong className="block font-semibold">
                                My interests
                            </strong>
                            <TagCollectionContainer className="my-1">
                                {interests.map(({ id, name }) => (
                                    <Tag key={id} id={id} name={name} />
                                ))}
                            </TagCollectionContainer>
                        </section>
                    </section>
                </div>
                {/* Member contact info */}
                <div className="flex flex-wrap gap-3">
                    <AnchorButton
                        icon={FaSlack}
                        size="sm"
                        href={slackProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {dict['slack-contact']}
                    </AnchorButton>
                    <AnchorButton
                        icon={FaGithub}
                        size="sm"
                        variant="outline"
                        href={gitHubProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {dict.github}
                    </AnchorButton>
                    {linkedInUrl && (
                        <AnchorButton
                            icon={FaLinkedin}
                            size="sm"
                            variant="outline"
                            href={linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dict.linkedin}
                        </AnchorButton>
                    )}
                </div>
            </div>
            {/* Member profile image */}
            <Avatar className="h-[175px] w-[175px]">
                <AvatarFallback>AS</AvatarFallback>
                <AvatarImage src={profileImg} />
            </Avatar>
        </section>
    )
}
