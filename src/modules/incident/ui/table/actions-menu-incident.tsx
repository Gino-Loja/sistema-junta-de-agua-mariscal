'use client'

import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon ";
import { useDeleteStore, useFormDrawer, useIncidentStore, useUserStore } from "@/lib/store";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function ActionsMenuIncident({ data }: { data: Incident }) {

    const { onOpen } = useFormDrawer();
    const { setType, openModal } = useUserStore();
    const { setIncident } = useIncidentStore()
    const { setId } = useDeleteStore();
    

    // console.log(data,"data")
    return (
        <div className="relative flex justify-end items-center gap-2">
            <Dropdown classNames={{
                base: "before:bg-default-200",
                content: "py-1 px-1 border border-default-200 from-white to-default-200 dark:from-default-50 dark:to-black",
            }}>
                <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu >


                    <DropdownItem

                        key="update"
                        onPress={() => {
                            setType("update")
                            setIncident(data)
                            onOpen()
                        }}
                    >
                        Actualizar
                    </DropdownItem>
                    <DropdownItem

                        key="delete"
                        
                        onPress={() => {
                            setType("delete")
                            setId(data.id)
                            openModal()
                        }}
                    >
                        Eliminar
                    </DropdownItem>



                </DropdownMenu>
            </Dropdown>
        </div>
    );

}

