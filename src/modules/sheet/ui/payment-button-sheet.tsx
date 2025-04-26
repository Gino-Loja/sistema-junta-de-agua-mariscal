'use client'
import { useUserStore } from "@/lib/store";
import { Sheets } from "@/model/types";
import { Button } from "@nextui-org/react";
import { Receipt } from "lucide-react";

export default function PaymentButtonSheet({ sheets }: { sheets: Sheets }) {
    const { setData, setType, openModal } = useUserStore();

    return (
        <Button isIconOnly
            color="success"
            variant="light"
            size="sm"
            onPress={
                () => {
                    setData(sheets);
                    setType("update");
                    openModal();
                }
            }>
            <Receipt />
        </Button>
    )
}