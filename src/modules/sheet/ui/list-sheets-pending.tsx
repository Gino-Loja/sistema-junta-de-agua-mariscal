'use client'
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";

type ListSheetsPendingProps = {
    fecha: Date,
    valor_abonado: number,
    total_pagar: number,
    id: number
}

export default function ListSheetsPending({ data }: { data: ListSheetsPendingProps[] }) {
    if (!data || data.length === 0) {
        return <p className="text-gray-500 text-center">No hay planillas pendientes.</p>;
    }
    const formatFecha = (fecha: Date | undefined) => {
        if (!fecha) return "Fecha no disponible";
        return new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "long", year: "numeric" }).format(fecha);
    };

    return (
        <Listbox variant="faded"
            color="danger"
            topContent={
                <div className="flex items-center gap-2">
                    <p className="text-ms font-semibold">
                        {data.length} planillas pendientes
                    </p>
                </div>
            } 
            aria-label="Planillas pendientes">

            {data.map((item) =>
                <ListboxItem className="flex justify-between items-center border-sm" key={item.id}  >
                    <div>
                        <p className="text-sm">{formatFecha(item.fecha)}</p>
                        <p className="text-md font-semibold">
                            ${item.total_pagar.toString() ? item.total_pagar.toFixed(2) : "0.00"}
                        </p>
                    </div>
                    <p className="text-sm ">
                        Abonado: ${item.valor_abonado.toString()  ? item.valor_abonado.toFixed(2) : "0.00"}
                    </p>
                </ListboxItem>
            )}
        </Listbox>
    );
}

