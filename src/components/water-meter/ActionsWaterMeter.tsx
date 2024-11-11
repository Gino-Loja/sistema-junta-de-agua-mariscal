'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon ";
import { useUserStore, } from "@/lib/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WaterMeter } from "@/model/types";
import Link from "next/link";

interface ActionsProps<T> {
    data: WaterMeter;
}

export function ActionsWaterMeter<T>({ data }: ActionsProps<T>) {
    const { setData, setType, openModal } = useUserStore();

    const router = useRouter()


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
                        onPress={() => {


                            setData(data);
                            setType("update");
                            openModal();
                        }}
                    >
                        Actualizar Medidor
                    </DropdownItem>

                    <DropdownItem
                        // onPress={() => {
                        //     router.push(`/water-meter/${data.id}/`)
                        // }}
                    >

                        <Link  href={`/water-meter/${data.usuario_id}/`}  className="flex items-center gap-2">
                            <span>Ver Medidor</span>
                        </Link>
                    </DropdownItem>
                 
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
