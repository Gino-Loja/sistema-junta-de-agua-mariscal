'use client'
import { Button, Tooltip } from "@nextui-org/react"
import { useFormDrawer, useUserStore } from "@/lib/store";
import { AddIcon } from "@/components/icons/add-icon";
import { useRouter } from "next/navigation";

export default function AddMeeting() {

    const router = useRouter()


    return (
        <Tooltip content="Agregar Usuario">
            <Button  radius="full" onPress={() => {

                router.push(`/invoice/`)
               
            }} isIconOnly about="agregar" color="primary" aria-label="Like">
                <AddIcon />
            </Button>
        </Tooltip>

    )
}       