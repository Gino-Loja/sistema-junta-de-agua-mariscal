'use client'

import { useDeleteStore, useUserStore } from "@/lib/store"
import { QueryResultError } from "@/model/types"
import { toast } from "react-toastify"
import { AlertTriangle } from 'lucide-react'
import React from "react"
import { Button } from "@nextui-org/react"

export function FormDelete({ funtionDelete }: { funtionDelete: (id: number) => Promise<QueryResultError<boolean>> }) {
    const { setId, id ,  closeModalDelete} = useDeleteStore()
    const [isloading, setIsloading] = React.useState(false)

    const deleteData = async () => {
        setIsloading(true)
        const result = await funtionDelete(id)
        if (result.success) {
            setIsloading(false)
            setId(0)
            closeModalDelete()
            toast.success('Registro eliminado exitosamente')
        } else {
            setIsloading(false)

            toast.error(result.error)
        }
    }

    return (
        <div className=" p-6 rounded-lg  max-w-md mx-auto">
            <div className="flex items-center justify-center mb-6 text-yellow-500">
                <AlertTriangle size={48} />
            </div>
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                ¿Estás seguro de que deseas eliminar este registro?
            </h1>
            <div className="flex justify-center space-x-4">
                <Button
                    isLoading={isloading}
                    onPress={deleteData}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Eliminar
                </Button>
                <button
                    onClick={() => { setId(0); closeModalDelete() }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}
