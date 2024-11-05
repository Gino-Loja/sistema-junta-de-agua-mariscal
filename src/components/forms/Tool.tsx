'use client'
import { Button,Tooltip } from "@nextui-org/react"
import { AddIcon } from "../icons/add-icon"
import {  useUserStore } from "@/lib/store";

export default function TooltipSheets() {
    const { openModal, setData, setType } = useUserStore();

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