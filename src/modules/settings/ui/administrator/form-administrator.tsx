'use client'

import { Card, CardHeader, CardBody, Button, Input, Avatar } from "@nextui-org/react"


export default function FormAdministrator({ user }: { user: { id: string, name: string, email: string }  }) {
    return (

        <div className="flex h-full items-center justify-center px-4 py-12">
            <Card className="w-full max-w-xl">
                <CardHeader className="flex flex-col items-center pb-6">
                    <Avatar
                        style={{
                            width: "100px",
                            height: "100px",

                        }}
                        className="text-large mb-4"
                        isBordered
                        color="primary"
                        name="Mariscal2004"
                    />
                    <h1 className="text-2xl font-semibold text-gray-800">Perfil de Usuario</h1>
                </CardHeader>
                <CardBody className="px-6">
                    <form className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Input
                                id="username"
                                label="Usuario"
                                defaultValue="Mariscal2004"
                                isReadOnly
                                variant="bordered"
                            />


                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                            <div className="space-y-4">
                                <Input
                                    id="current-password"
                                    label="Contraseña actual"
                                    type="password"
                                    defaultValue="••••••••••"
                                    variant="bordered"
                                />
                                <Input
                                    id="new-password"
                                    label="Nueva contraseña"
                                    type="password"
                                    variant="bordered"
                                />
                                <Input
                                    id="confirm-password"
                                    label="Confirmar contraseña nueva"
                                    type="password"
                                    variant="bordered"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                color="primary"
                            >
                                Guardar Cambios
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>

    )
}