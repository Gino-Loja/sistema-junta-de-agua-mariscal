
'use client'
import { coordinatesParsers } from "@/modules/searchParams";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import { useQueryStates } from "nuqs";
import { useEffect } from "react";
export type WaterMeterProps = {
    id: number,
    estado: string,
    tipo: string,

}

export default function SelectWaterMeterByUser({ waterMeter }: { waterMeter: WaterMeterProps[] }) {
    const [{ wm }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });

    console.log(waterMeter, "wm")


    useEffect(() => {
        if (waterMeter.length > 0) {
            setCoordinates({ wm: waterMeter[0].id })
        }
    }, []);

    //params.set('medidor', waterMeter[0].id.toString());

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            const id = parseInt(e.target.value, 10);
            setCoordinates({ wm: id });
            return;
        }
        setCoordinates({ wm: null });
    };

    return (

        <Select
            size="sm"
            label="Selecciona un medidor"
            className="max-w-xs"
            selectedKeys={[String(waterMeter[0].id)]}
            onChange={handleSelectionChange}
            disallowEmptySelection
            listboxProps={{
                itemClasses: {
                    base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                },
            }}            
        >
            {waterMeter.map((medidor) => (
                <SelectItem startContent={
                    <Chip size="sm" color={medidor.estado === "Activo" ? 'success' : "danger"}>{medidor.estado}</Chip>
                }
                    key={medidor.id}
                    value={String(medidor.id)}
                    textValue={medidor.id.toString()}
                >

                    <div className="flex items-center text-sm">
                        <span className="text-default-500 text-tiny">{medidor.tipo}</span>
                        <span className="text-default-500 font-bold text-tiny ml-2">{medidor.id}</span>
                    </div>




                </SelectItem>
            ))}
        </Select>

    );
}