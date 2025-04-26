'use client'

import { Card, CardHeader, CardBody, Button, Input, Avatar, Select, SelectItem } from "@nextui-org/react"
import { profileUpdateAdministratorAction } from "../../utils/profile-update-administrator"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useFormStatus } from 'react-dom'

export default function ProfileFormAdministrator({ user }:
    {
        user: {

            nombres: string,
            celular: string,
            rol: string,
            email: string,
            estado: string,
            usuario: string
        }
    }) {

    const initialState = { success: false, error: '' }

    const [state, formAction] = useFormState(profileUpdateAdministratorAction, initialState)

    const ButtonSubmit = () => {
        const { pending } = useFormStatus()

        return (
            <Button
                className="w-full"
                type="submit"
                variant="flat"
                color="primary"
                isLoading={pending}
                disabled={pending} >
                {pending ? 'Validando' : 'Guardar Cambios'}
            </Button>
        )
    }

    useEffect(() => {
        if (state?.error) {
            toast.error(state?.error.toString());
            return
        }

        if (state?.success) {
            toast.success("Usuario actualizado correctamente")
            return
        }
    }, [state])

    return (

        <div className="flex h-full items-center justify-center px-4 my-10 ">
            <Card shadow="none" className="w-full max-w-xl shadow border">
                <CardHeader className="flex flex-col items-center pb-6">
                    <Avatar
                        style={{
                            width: "100px",
                            height: "100px",

                        }}
                        className="text-large mb-4"
                        isBordered
                        color="primary"
                        name={user.usuario}
                    />
                    <h1 className="text-2xl font-semibold text-gray-800">Perfil de Usuario</h1>
                </CardHeader>
                <CardBody className="px-6">
                    <form action={formAction} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Datos Administrador</h3>
                            <div className="grid gap-3 md:grid-cols-2">


                                <Input
                                    name="usuario"
                                    label="Usuario"
                                    defaultValue={user.usuario}
                                    variant="bordered"
                                    size="sm"
                                />
                                <Input
                                    name="nombres"
                                    label="Nombres"
                                    defaultValue={user.nombres}
                                    variant="bordered"
                                    size="sm"

                                />
                                <Input
                                    name="email"
                                    label="correo"
                                    type="email"
                                    defaultValue={user.email}
                                    variant="bordered"
                                    size="sm"

                                />
                                <Input
                                    name="celular"
                                    label="celular"
                                    type="tel"
                                    defaultValue={user.celular}
                                    variant="bordered"
                                    size="sm"

                                />

                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Estado</h3>
                            <div className="grid gap-3 md:grid-cols-2">


                                <Select
                                    label="Estado"
                                    name="estado"
                                    disallowEmptySelection
                                    size="sm"

                                    defaultSelectedKeys={[user.estado]}
                                    placeholder="">
                                    <SelectItem key={'activo'}>Activo</SelectItem>
                                    <SelectItem key={'inactivo'}>Inactivo</SelectItem>
                                </Select>

                                <Select
                                    label="rol"
                                    size="sm"
                                    name="rol"

                                    disallowEmptySelection
                                    defaultSelectedKeys={[user.rol]}
                                    placeholder="">
                                    <SelectItem key={'administrador'}>Administrador</SelectItem>
                                </Select>




                            </div>
                        </div>


                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                            <div className="space-y-4">

                                <Input size="sm"
                                    name="newPassword"
                                    label="Nueva contraseña"
                                    type="password"
                                    variant="bordered"
                                />
                                <Input
                                    size="sm"
                                    name="confirmPassword"
                                    label="Confirmar contraseña nueva"
                                    type="password"
                                    variant="bordered"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <ButtonSubmit />
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>

    )
}