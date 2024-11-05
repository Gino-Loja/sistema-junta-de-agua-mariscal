'use client'
import {  useUserStore } from "@/lib/store";
import { Button, Tooltip } from "@nextui-org/react"
import { AddIcon } from "../icons/add-icon";


export default function TooltipUser() {
   
    const { setType, openModal, setData } = useUserStore();
    
    return (
        <Tooltip content="Agregar lecturas">
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