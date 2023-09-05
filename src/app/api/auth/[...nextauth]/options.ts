import { AccountsRepository } from '@/backend/infrastructure/repositories/accounts-repository'
import { NextAuthOptions } from 'next-auth'
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'

const accountsRepository = new AccountsRepository()

const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            /* @ts-ignore */
            async profile(profile: GithubProfile) {
                const { id: ghId, login, node_id } = profile

                let id: string | void
                // Find user
                id = await accountsRepository.getAccountIdByGHId(ghId)
                if (id) return { ...profile, name: login, isMember: true, id }

                // If doesn't exist, find OnboardingUser
                id = await accountsRepository.getOnboardingAccountIdByGHId(ghId)
                if (id) return { ...profile, name: login, isMember: false, id }

                // if doesn't exist, create an OnboardingUser
                id = await accountsRepository.createOnboardingAccount(
                    ghId,
                    node_id,
                    login
                )
                return { ...profile, name: login, isMember: false, id }
            },
            clientId: process.env.GITHUB_OAUTH_ID!,
            clientSecret: process.env.GITHUB_OAUTH_SECRET!,
            authorization: {
                params: { scope: 'read:user' } // Ignore the email
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.isMember = user.isMember ?? false
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.isMember = token.isMember
                session.user.id = token.id
            }
            return session
        }
    }
}

export default options
