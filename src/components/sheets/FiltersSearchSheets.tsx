'use client'
import {
     DatePicker
} from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter, useParams } from "next/navigation";
import { now, getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";


export default function FiltersSearchSheets() {
    //const date = new Date(Date.now());

    const searchParams = useSearchParams();
    const search = searchParams.get('date');
    let dateParams = search != null ? parseAbsoluteToLocal(new Date(search).toISOString()) : now(getLocalTimeZone());


    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilterChange = (year: string, month: string, day: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('date', `${year}-${month}-${day}`); // Establece el año

        //params.set('month', month); // Establece el mes
        replace(`${pathname}?${params.toString()}`); // Actualiza la URL
    };

    return (
        <I18nProvider locale="es">
            <DatePicker
            
                label="Filtro por fecha"
                granularity="day"
                showMonthAndYearPickers
                defaultValue={dateParams}
                labelPlacement={'outside-left'}
                onChange={(date) => {
                    handleFilterChange(date.year.toString(), date.month.toString(), date.day.toString());
                }}
            />

        </I18nProvider>


    );
}