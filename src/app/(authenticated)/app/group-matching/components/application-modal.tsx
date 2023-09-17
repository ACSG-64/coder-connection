import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Small } from '@/components/ui/typography'

export function ApplicationModal({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Apply</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Group matching application</DialogTitle>
                    <DialogDescription>
                        Apply to be paired in a group with other people that
                        have shared interests with you.
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Small>
                        Note: If an ideal group is found you will be notified
                        via Slack. Once you submit your application, go to Slack
                        and see if you have been assigned to a group. You may
                        have to wait several days until we find the perfect
                        group mates for you. Once you are assigned to a group,
                        your application will be deleted.
                    </Small>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
