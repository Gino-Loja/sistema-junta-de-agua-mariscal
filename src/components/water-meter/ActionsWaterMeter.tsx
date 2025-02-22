'use client'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon ";
import { useDeleteStore, useUserStore, } from "@/lib/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WaterMeter } from "@/model/types";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ActionsProps<T> {
    data: WaterMeter;
}

export function ActionsWaterMeter<T>({ data }: ActionsProps<T>) {
    const { setData, setType, openModal,  } = useUserStore();
    const { setId,openModalDelete } = useDeleteStore();
    

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
                        key={2}
                        startContent={<Pencil className="text-primary-500 h-4 w-4 " />}


                        onPress={() => {


                            setData(data);
                            setType("update");
                            openModal();
                        }}
                    >
                        Actualizar Medidor
                    </DropdownItem>
                    <DropdownItem
                        key={2}
                        startContent={<Trash2 className="text-danger-500 h-4 w-4" />}


                        onPress={() => {
                            setId(data.id);
                            setType("delete");
                            openModalDelete();
                        }}
                    >
                        Eliminar Medidor
                    </DropdownItem>

                    <DropdownItem
                        key={1}
                        startContent={<Eye  className="text-default-500 h-4 w-4" />}
                        onPress={() => {
                            router.push(`/water-meter/${data.usuario_id}/`);
                        }}

                    // onPress={() => {
                    //     router.push(`/water-meter/${data.id}/`)
                    // }}
                    >

                        <Link href={`/water-meter/${data.usuario_id}/`} className="flex items-center gap-2">
                            <span>Ver Medidor</span>
                        </Link>
                    </DropdownItem>


                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
