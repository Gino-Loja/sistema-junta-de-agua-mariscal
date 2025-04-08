'use client'
import { Button, Tooltip } from "@nextui-org/react"
import { useFormDrawer, useUserStore } from "@/lib/store";
import { AddIcon } from "@/components/icons/add-icon";

export default function AddMeeting() {
    const { onOpen } = useFormDrawer()
    const { setData, setType } = useUserStore();

    return (
        <Tooltip placement="right-start" content="Agregar Multa">
            <Button radius="full" onPress={() => {
                setType("create")
                setData(null)
                onOpen()
            }} isIconOnly about="agregar" color="primary" aria-label="Like">
                <AddIcon />
            </Button>
        </Tooltip>

    )
}       