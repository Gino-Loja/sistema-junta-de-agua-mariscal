'use client'

import { Button, Input } from "@nextui-org/react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useFormStatus } from 'react-dom'
import { useUserStore } from "@/lib/store"
import { addSectorsAdministratorAction } from "../../utils/add-sectors-administrator"


export function FormAddSectors() {

    const initialState = { success: false, error: '' }
    const { closeModal } = useUserStore();

    const [state, formAction] = useFormState(addSectorsAdministratorAction, initialState)
    
    // formAction.bind(null, data.id)
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
            toast.success("Datos agregados correctamente")
            closeModal()
            return
        }
    }, [state])

   

    return (

        <form action={formAction} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Datos Sector</h3>
                <div className="grid gap-3 md:grid-cols-2">
                    {/* <input type="hidden" name="id" value={data.id} /> */}

                    <Input
                        name="nombre"
                        label="Nombre del sector"
                        // defaultValue={data.usuario}
                        variant="bordered"
                        size="sm"
                    />
                    <Input
                        name="descripcion"
                        label="Descripción"
                        // defaultValue={data.nombres}
                        variant="bordered"
                        size="sm"

                    />
                    

                </div>
            </div>

            

            
            <div className="flex justify-end pt-6">
                <ButtonSubmit />
            </div>
        </form>

    )
}