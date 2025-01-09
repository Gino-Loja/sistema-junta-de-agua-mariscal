'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useDeleteStore, useUserStore, } from "@/lib/store";
import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon ";
import { MeasurementMacro } from "@/model/types";



export function ActionsMenuMeasurement({ data }: { data: MeasurementMacro }) {
    const { setData, setType, openModal } = useUserStore();
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
                            openModal()
                        }}
                    >
                        Actualizar
                    </DropdownItem>
                    <DropdownItem
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
