'use client'

import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon ";
import { useFormDrawer, useUserStore } from "@/lib/store";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function ActionMeeting({ data }: any) {




    const { onOpen } = useFormDrawer();
    const { setData, setType } = useUserStore();


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
                            setType("create")
                            setData(data)
                            onOpen()
                        }}
                    >
                        Actualizar
                    </DropdownItem>



                </DropdownMenu>
            </Dropdown>
        </div>
    );

}

