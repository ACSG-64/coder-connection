'use client'

import { Button } from '@/components/ui/button'
//import { useRouter } from 'next/router'

export default function Switch() {
    //const router = useRouter()
    const onClickHandler = async () => {
        const res = await fetch('/api/lang', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'same-origin'
            },
            body: JSON.stringify({ lang: 'es' })
        })

        const txt = await res.text()
        console.log(txt)

        //router.reload()
    }
    return <Button onClick={onClickHandler}>Change lang</Button>
}
