'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useUserStore, } from "@/lib/store";
import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon ";
import { Administrators } from "../../types";

interface ActionsProps<T> {
    data: Administrators;
}

export function ActionsColumnAdministrator<T>({ data }: ActionsProps<T>) {
    const { setData, setType, openModal } = useUserStore();



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
                <DropdownMenu>
                    <DropdownItem
                        key={'edit'}
                        onPress={() => {
                            setData(data);
                            setType("update");
                            openModal();
                        }}
                    >
                        Editar
                    </DropdownItem>
                    <DropdownItem
                        key={'delete'}
                        onPress={() => {
                            setData(data);
                            setType("delete");
                            openModal();
                        }}
                    >
                        Eliminar
                    </DropdownItem>

                    {/* <DropdownItem
                    key={'link'}
                    >

                        <Link href={`/sheets/${data.id}/`} className="flex items-center gap-2">
                            <span>Ver Planillas</span>
                        </Link>
                    </DropdownItem> */}

                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
