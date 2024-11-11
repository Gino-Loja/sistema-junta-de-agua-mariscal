
'use client'
import { WaterMeter } from "@/model/types";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectWaterMeter({ waterMeter }: { waterMeter: WaterMeter[] }) {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams.toString());

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        params.set('medidor', e.target.value.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (

        <Select
            size="sm"
            label="Selecciona un medidor"
            className="max-w-xs"
            defaultSelectedKeys={[String(waterMeter[0].id)]}
            onChange={handleSelectionChange}
        >
            {waterMeter.map((medidor) => (
                <SelectItem key={medidor.id} >
                    {medidor.numero_serie}
                </SelectItem>
            ))}
        </Select>

    );
}