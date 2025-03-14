'use client'
import {
    DatePicker
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useQueryStates } from 'nuqs'
import { coordinatesParsers } from '@/modules/searchParams';

export default function FiltersSearchSheets() {
    //const date = new Date(Date.now());
    const [{ date }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });

    //let dateParams = date != null ? parseAbsoluteToLocal(now(TIME_ZONE).toAbsoluteString()) : now(TIME_ZONE);

    const handleFilterChange = (year: string, month: string, day: string) => {
        setCoordinates({ date: `${year}-${month}-${day}` })
    };

    return (
        <I18nProvider locale="es">
            <DatePicker
                label="Filtro por fecha"
                granularity="day"
                showMonthAndYearPickers
                labelPlacement={'outside-left'}
                onChange={(date) => {
                    if (date) {
                        handleFilterChange(date.year.toString(), date.month.toString(), date.day.toString());

                    }
                }}
            />
            {
                date &&
                <span className="flex items-center gap-2 cursor-pointer">
                    <span onClick={() => {
                        setCoordinates({ date: null , page: null })
                    }
                    } className="capitalize text-sm underline decoration-sky-500">Limpiar filtro</span>
                </span>

            }


        </I18nProvider>


    );
}