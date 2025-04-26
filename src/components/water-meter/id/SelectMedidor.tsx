
'use client'
import { WaterMeter } from "@/model/types";
import { coordinatesParsers } from "@/modules/searchParams";
import { Select, SelectItem } from "@nextui-org/react";
import { useQueryStates } from "nuqs";
import { useEffect } from "react";

export default function SelectWaterMeter({ waterMeter }: { waterMeter: WaterMeter[] }) {
    // const searchParams = useSearchParams()
    // const pathname = usePathname();
    // const { replace } = useRouter();
    // const params = new URLSearchParams(searchParams.toString());
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
            size="sm"
            label="Selecciona un medidor"
            className="max-w-xs"
            defaultSelectedKeys={[String(waterMeter[0].id)]}
            onChange={handleSelectionChange}
            disallowEmptySelection
        >
            {waterMeter.map((medidor) => (
                <SelectItem key={medidor.id} >
                    {medidor.numero_serie}
                </SelectItem>
            ))}
        </Select>

    );
}