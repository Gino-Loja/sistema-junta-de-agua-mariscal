'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            className="w-full"
            type="submit"
            variant="flat"
            color="primary"
            disabled={pending} >
            {pending ? 'Validando...' : 'Ingresar'}
        </Button>
    )
}