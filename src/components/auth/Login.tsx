'use client'

import { login } from "@/app/(auth)/login/action"
import { SubmitButton } from "@/app/(auth)/login/button"
import {  Input, Card, CardHeader, CardBody } from "@nextui-org/react"
import { useFormState } from "react-dom"

const initialState = {  error: '' }

export const Login = () => {
  const [state, formAction] = useFormState(login, initialState)

  return (
    <div className="flex flex-col w-full max-w-md mx-auto gap-4 mb-4">
      <Card>
        <CardHeader className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        </CardHeader>
        <CardBody className="space-y-6 px-4">
          <form action={formAction} className="space-y-6">
            <Input
              variant="bordered"
              label="Usuario"
              type="email"
              name="email"
              required
            />
            <Input
              variant="bordered"
              label="Password"
              type="password"
              name="password"
              required
            />

            {state.error && (
              <div className="text-red-500 text-sm text-center">
                {state.error}
              </div>
            )}

            <SubmitButton />
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
