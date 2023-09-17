import { H1, H2 } from '@/components/ui/typography'
import { RepositoryForm } from './components/repository-form'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VideoForm } from './components/video-form'

export default function GroupManagement() {
    return (
        <main>
            <header>
                <H2 className="text-3xl font-normal lg:text-3xl ">
                    Project pitch
                </H2>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Repository details</CardTitle>
                    <CardDescription>
                        Details of the project repository
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RepositoryForm />
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Video demo</CardTitle>
                    <CardDescription>
                        A video demonstrating the functionality of the project
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <VideoForm />
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
        </main>
    )
}
