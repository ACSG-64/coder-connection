import { H2 } from '@/components/ui/typography'
import { DetailsForm } from './components/form'

export default function DetailsPage() {
    return (
        <>
            <H2 className="text-2xl lg:text-2xl">Team details</H2>
            <DetailsForm />
        </>
    )
}
