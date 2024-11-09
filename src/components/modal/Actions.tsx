'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon ";
import { useUserStore, } from "@/lib/store";

interface ActionsProps<T> {
    data: T;
    items: { name: string; key: string }[];
}

export function CustomActions<T>({ data, items }: ActionsProps<T>) {
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
                <DropdownMenu items={items}>
                    

                    {(item) => (
                        <DropdownItem
                            key={item.key}
                            onPress={() => {
                                if (item.key === 'update') {
                                    
                                    setData(data);
                                    setType("update");
                                    openModal();
                                }
                                if (item.key === 'create') {
                                    setType("create")
                                    setData(data)
                                    openModal()
                                }
                            }}
                        >
                            {item.name}
                        </DropdownItem>
                    )}

                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
