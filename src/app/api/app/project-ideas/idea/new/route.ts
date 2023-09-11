import * as z from 'zod'
import options from '@/app/api/auth/[...nextauth]/options'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { TYPES, getDIContainer } from './config/di-container'
import { CreateProjectIdeaProposalCommand } from '@/backend/core/services/project-ideas/models/create-project-idea-proposal'
import { projectIdeaFormSchema } from '@/backend/core/services/project-ideas/schemas/project-idea-form'
import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'
import { CreateProjectIdeaProposalUseCase } from '@/backend/core/services/project-ideas/use-cases/create-project-idea-proposal-use-case'

export async function POST(req: NextRequest) {
    const { user } = (await getServerSession(options)) as Session
    const { title, summary, content, features, topics } =
        (await req.json()) as z.infer<typeof projectIdeaFormSchema>

    const container = await getDIContainer()

    let createProjectIdeaProposalCmd: CreateProjectIdeaProposalCommand
    try {
        createProjectIdeaProposalCmd = new CreateProjectIdeaProposalCommand(
            user.id,
            title,
            summary,
            content,
            features.map(({ feature }) => feature),
            topics.map(({ id, name }) => new TopicDTO(id, name))
        )
    } catch (e) {
        return new NextResponse('BAD', { status: 400 })
    }

    const createProjectIdeaUseCase =
        container.get<CreateProjectIdeaProposalUseCase>(
            TYPES.CreateProjectIdeaProposalUseCase
        )
    createProjectIdeaUseCase.createProposal(createProjectIdeaProposalCmd)

    return new NextResponse('OK', { status: 200 })
}
