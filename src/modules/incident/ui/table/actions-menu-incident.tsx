'use client'

import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon ";
import { useDeleteStore, useFormDrawer, useIncidentStore, useUserStore } from "@/lib/store";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

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
                        startContent={<Pencil className="text-primary-500 h-4 w-4 " />}

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
                        startContent={<Trash2 className="text-danger-500 h-4 w-4" />}

                        key="delete"

                        onPress={() => {
                            setType("delete")
                            setId(data.id)
                            openModal()
                        }}
                    >
                        Eliminar
                    </DropdownItem>

                    <DropdownItem
                        onPress={() => {
                            setIncident(data)
                        }}
                        key={1}
                        startContent={<Eye className="text-default-500 h-4 w-4" />}

                    // onPress={() => {
                    //     router.push(`/water-meter/${data.id}/`)
                    // }}
                    >

                        <Link href={`/incident/${data.id}/`} className="flex items-center gap-2">
                            <span>Ver Incidente</span>
                        </Link>
                    </DropdownItem>



                </DropdownMenu>
            </Dropdown>
        </div>
    );

}

