
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
            items={waterMeter}
            size="md"
            label="Selecciona un medidor"
            // labelPlacement=""
            className="max-w-xs"
            defaultSelectedKeys={[String(waterMeter[0].id)]}
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
            renderValue={(items) => {
                return items.map((item) => (
                    <div key={item.key} className="flex items-center gap-2 py-2 px-1 rounded-md">
                        <div
                            className="flex items-center text-sm gap-1"
                        >
                            <Chip size="sm" color={item.data?.estado === "Activo" ? 'success' : "danger"}>{item.data?.estado}</Chip>
                            <div className="flex items-center text-sm">
                                <span className="text-default-500 text-tiny">{item.data?.tipo}</span>
                                <span className="text-default-500 font-bold text-tiny ml-2">{item.data?.id}</span>
                            </div>
                        </div>
                    </div>
                ));
            }}
        >
            {
                (medidor) => (
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
                )
            }
        </Select>

    );
}