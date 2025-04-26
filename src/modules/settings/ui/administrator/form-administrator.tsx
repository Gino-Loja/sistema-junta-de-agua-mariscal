'use client'

import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useFormStatus } from 'react-dom'
import { useUserStore } from "@/lib/store"
import { updateAdministratorAction } from "../../utils/update-administrator"

export default function FormAdministrator() {

    const initialState = { success: false, error: '' }
    const { type, data, closeModal } = useUserStore();

    // const formActionWithId = async (initialState: any, formData: FormData) => {
    //     // Añadimos el ID del usuario al FormData programáticamente
    //     formData.append('id', data.id);
    //     console.log(formData)
    //     // Llamamos a la acción original con el FormData modificado
    //     return updateAdministratorAction(initialState, formData);
    // }




    const [state, formAction] = useFormState(updateAdministratorAction, initialState)
    
    formAction.bind(null, data.id)

    

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
            closeModal()
            return
        }
    }, [state])

   

    return (


        <form action={formAction} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Datos Administrador</h3>
                <div className="grid gap-3 md:grid-cols-2">
                    <input type="hidden" name="id" value={data.id} />

                    <Input
                        name="usuario"
                        label="Usuario"
                        defaultValue={data.usuario}
                        variant="bordered"
                        size="sm"
                    />
                    <Input
                        name="nombres"
                        label="Nombres"
                        defaultValue={data.nombres}
                        variant="bordered"
                        size="sm"

                    />
                    <Input
                        name="email"
                        label="correo"
                        type="email"
                        defaultValue={data.email}
                        variant="bordered"
                        size="sm"

                    />
                    <Input
                        name="celular"
                        label="celular"
                        type="tel"
                        defaultValue={data.celular}
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

                        defaultSelectedKeys={[data.estado]}
                        placeholder="">
                        <SelectItem key={'activo'}>Activo</SelectItem>
                        <SelectItem key={'inactivo'}>Inactivo</SelectItem>
                    </Select>

                    <Select
                        label="rol"
                        size="sm"
                        name="rol"

                        disallowEmptySelection
                        defaultSelectedKeys={[data.rol]}
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

    )
}