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
import { FaGithub } from 'react-icons/fa6'
import NewGroupForm from './new-group-form'
import { Small } from '@/components/ui/typography'
import { getSessionUser } from '@/backend/core/shared/get-user'

export async function CreateGroupModal({ ideaId }: { ideaId: number }) {
    const user = await getSessionUser()
    user!.username
    // TODO do something if not exists
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button icon={FaGithub} size={'lg'}>
                    Work on this project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Work on this project</DialogTitle>
                    <DialogDescription>
                        Fork this project idea and create a working group to
                        start implementing this idea.
                    </DialogDescription>
                </DialogHeader>
                <Button variant="outline" icon={FaGithub}>
                    Fork this repository
                </Button>
                <NewGroupForm ghUsername={user!.username} ideaId={ideaId} />
                <DialogFooter>
                    <Small>
                        Note: if this idea is deleted, groups implementing it
                        will be also deleted.
                    </Small>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
