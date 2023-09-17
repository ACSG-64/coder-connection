import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

export default function InvitationPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Join the Software Artisans team</CardTitle>
                    <CardDescription>
                        You&#39;ve received a direct invitation to request
                        access to this group
                    </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Decline</Button>
                    <Button>Accept</Button>
                </CardFooter>
            </Card>
        </main>
    )
}
