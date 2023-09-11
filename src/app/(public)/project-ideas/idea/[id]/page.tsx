import ProjectIdeaDetailsPage from '@/app/_pages/project-idea-detail/page'

interface ProjectIdeaDetailsProps {
    params: { id: number }
}

export default async function ProjectIdeaDetails({
    params
}: ProjectIdeaDetailsProps) {
    return <ProjectIdeaDetailsPage ideaId={params.id} />
}
