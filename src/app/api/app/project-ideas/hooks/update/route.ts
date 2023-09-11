import { NextRequest, NextResponse } from 'next/server'
import { TYPES, getDIContainer } from '../config/di-container'
import {
    EVENTS,
    ManageProjectIdeaUseCase
} from '@/backend/core/services/project-ideas/use-cases/manage-project-idea-use-case'
import { ProjectIdeaGH } from '@/backend/core/services/project-ideas/models/ideas/project-idea-gh'
import { createHmac, timingSafeEqual } from 'crypto'

function verifySignature(payload: any, signature: string, secret: string) {
    const hmac = createHmac('sha256', secret)
    const expectedSignature = `sha256=${hmac.update(payload).digest('hex')}`
    return timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    )
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get('x-hub-signature-256')
    const payload = await req.text()
    if (
        !verifySignature(
            payload,
            signature!,
            process.env.GITHUB_WEBOOK_SECRET as string
        )
    ) {
        return new NextResponse('Invalid secret', { status: 400 })
    }

    const body = JSON.parse(payload) as {
        action: string
        repository: {
            id: number
            node_id: string
            name: string
            description: string
            topics: string[]
        }
    }

    console.log(body)

    const container = await getDIContainer()

    const projectIdeasController = container.get<ManageProjectIdeaUseCase>(
        TYPES.ManageProjectIdeaUseCase
    )
    const repo = new ProjectIdeaGH(
        body.repository.id,
        body.repository.node_id,
        body.repository.name,
        body.repository.description,
        body.repository.topics
    )

    switch (body.action) {
        case 'publicized':
            projectIdeasController.manage(EVENTS.CREATE_OR_UNHIDE, repo)
            break
        case 'deleted':
            projectIdeasController.manage(EVENTS.DELETE, repo)
            break
        case 'renamed':
        case 'edited':
            projectIdeasController.manage(EVENTS.UPDATE, repo)
            break
        case 'privatized':
            projectIdeasController.manage(EVENTS.HIDE, repo)
            break
    }

    return new NextResponse('OK')
}
