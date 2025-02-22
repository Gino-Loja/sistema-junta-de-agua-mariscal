'use client'

import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon ";
import { useDeleteStore, useFormDrawer, useUserStore } from "@/lib/store";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Pencil, Trash2 } from "lucide-react";

export default function ActionMeeting({ data }: any) {




    const { onOpen } = useFormDrawer();
    const { setData, setType } = useUserStore();
    const { setId, openModalDelete } = useDeleteStore();
    


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
                            setData(data)
                            onOpen()
                        }}
                        startContent={<Pencil className="text-primary-500 h-4 w-4 " />}
                    >
                            Actualizar
                        
                    </DropdownItem>
                    <DropdownItem
                        startContent={<Trash2 className="text-danger-500 h-4 w-4" />}


                        key="delete"
                        onPress={() => {
                            setType("delete")
                            setId(data.id)
                            openModalDelete()
                            
                        }}
                    >
                        Eliminar
                    </DropdownItem>



                </DropdownMenu>
            </Dropdown>
        </div>
    );

}

