'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon ";
import { useUserStore, } from "@/lib/store";
import { User } from "@/model/User";
import { Pencil } from "lucide-react";



export const Actions = ({ data }: { data: User }) => {
    const { setData, setType, openModal } = useUserStore();

    return (
        <div className="relative flex justify-end items-center gap-2">
            <Dropdown classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "py-1 px-1 border border-default-200 from-white to-default-200 dark:from-default-50 dark:to-black",
            }}>
                <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                        <VerticalDotsIcon className="text-default-300" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {/* <DropdownItem
                        key={1}
                        onPress={() => {
                        }}>View</DropdownItem> */}
                    <DropdownItem key={2}
                        startContent={<Pencil className="text-primary-500 h-4 w-4 " />}

                        onPress={() => {
                            setData(data);
                            setType("update");
                            openModal();
                        }}>Editar</DropdownItem>
                    {/* <DropdownItem>E</DropdownItem> */}
                </DropdownMenu>
            </Dropdown>
        </div>

    );
};  