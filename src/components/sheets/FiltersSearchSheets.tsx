'use client'
import {
    DatePicker
} from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { now, getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useQueryStates } from 'nuqs'
import { coordinatesParsers } from '@/modules/searchParams';

export default function FiltersSearchSheets() {
    //const date = new Date(Date.now());
    const [{ date }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false  
    });
    
    let dateParams = date != null ? parseAbsoluteToLocal(new Date(date).toISOString()) : now(getLocalTimeZone());

    const handleFilterChange = (year: string, month: string, day: string) => {
        setCoordinates({ date: `${year}-${month}-${day}` })
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
                    if (date) {
                        handleFilterChange(date.year.toString(), date.month.toString(), date.day.toString());

                    }
                }}
            />

        </I18nProvider>


    );
}