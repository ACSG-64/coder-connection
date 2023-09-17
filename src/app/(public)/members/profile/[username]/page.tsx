import {
    ProfilePage,
    generateMetadata as _generateMetadata
} from '@/app/_pages/profile'

interface RouteProps {
    params: { username: string }
}

export async function generateMetadata({ params: { username } }: RouteProps) {
    return _generateMetadata({ username })
}

export default async function Profile({ params: { username } }: RouteProps) {
    return (
        <div className="m-auto mt-5 max-w-screen-xl">
            <ProfilePage username={username}></ProfilePage>
        </div>
    )
}
