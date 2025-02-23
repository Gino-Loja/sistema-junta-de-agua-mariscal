'use client'

import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon ";
import {  useUserStore } from "@/lib/store";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ActionInvoice({data}: any) {

   



    const { setData } = useUserStore();
    const router = useRouter();


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
                            setData(data)
                            router.push(`/invoice/${data.id}/`)
                        }}
                    >
                        <Link href={`/invoice/${data.id}/`} className="flex items-center gap-2">
                            <span>Ver Documento</span>
                        </Link>
                    </DropdownItem>



                </DropdownMenu>
            </Dropdown>
        </div>
    );

}

