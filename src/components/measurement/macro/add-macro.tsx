
"use client"
import { AddIcon } from "@/components/icons/add-icon";
import { useUserStore } from "@/lib/store";
import { Button, Tooltip } from "@nextui-org/react";

export default function AddMacro() {
   
    const { setType, openModal , setData} = useUserStore();
    
    return (
        <Tooltip content="Agregar Lectura">
          <Button radius="full" onPress={() => {
            setType("create")
            setData(null)
            openModal()
          }} isIconOnly about="agregar" color="primary" aria-label="Like">
            <AddIcon />
          </Button>
        </Tooltip>
    )
}