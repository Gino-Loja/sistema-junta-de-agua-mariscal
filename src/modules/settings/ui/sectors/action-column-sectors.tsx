'use client'
import { Button } from "@nextui-org/react";
import { useUserStore, } from "@/lib/store";
import { SectorsTable } from "../../types";
import { SquarePen } from "lucide-react";

interface ActionsProps<T> {
    data: SectorsTable;
}

export function ActionsColumnSectors<T>({ data }: ActionsProps<T>) {
    const { setData, setType, openModal } = useUserStore();
    

    // console.log(data,"data")
    return (
        <div
            className="relative flex justify-end items-center gap-2">
            <Button
                isIconOnly
                color="primary"
                variant="light"
                size="sm"
                onPress={
                    () => {
                        setType("update");
                        setData(data)
                        openModal();

                    }
                }>
                <SquarePen />


            </Button>
        </div>
    );
}
