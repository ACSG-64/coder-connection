import options from '@/app/api/auth/[...nextauth]/options'
import { MembersRepository } from '@/backend/infrastructure/repositories/members-repository'
import MemberCard from '@/components/cards/member-card'
import { H1 } from '@/components/ui/typography'
import { getServerSession } from 'next-auth/next'

export default async function Members() {
    const session = await getServerSession(options)
    const membersRepo = new MembersRepository()
    const results = await membersRepo.getByCompetency(session?.user?.id)

    return (
        <>
            <H1 className="lg:text-3xl">Members</H1>
            <div
                className="grid auto-rows-auto grid-cols-3 gap-8"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
                }}
            >
                {results.map(
                    ({ username, name, surname, matchingScore }, i) => (
                        <MemberCard
                            key={username}
                            username={username}
                            name={name}
                            surname={surname}
                            affinityScore={matchingScore}
                        />
                    )
                )}
            </div>
        </>
    )
}
