'use client'
import { Button, Tooltip } from "@nextui-org/react"
import { useFormDrawer, useIncidentStore, useUserStore } from "@/lib/store";
import { AddIcon } from "@/components/icons/add-icon";

export default function AddIncident() {

    const { onOpen } = useFormDrawer()
    const { setType } = useUserStore()
    const { clearIncident } = useIncidentStore()

    return (
        <Tooltip content="Agregar Incidente">
            <Button radius="full" onPress={() => {
                setType('create')
                clearIncident()
                onOpen()
            }} isIconOnly about="agregar" color="primary" aria-label="Like">
                <AddIcon />
            </Button>
        </Tooltip>

    )
}       