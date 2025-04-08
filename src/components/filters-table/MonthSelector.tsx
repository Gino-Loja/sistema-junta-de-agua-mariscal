'use client'
import React, { useState } from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { useQueryStates } from 'nuqs';
import { coordinatesParsers } from '@/modules/searchParams';
import { TIME_ZONE } from '@/model/Definitions';
import { now } from "@internationalized/date";

interface MonthSelectorProps {
    value?: { month: number };
    locale?: 'en' | 'es';
}

const MONTHS = {
    es: [
        { value: 1, label: "Enero" },
        { value: 2, label: "Febrero" },
        { value: 3, label: "Marzo" },
        { value: 4, label: "Abril" },
        { value: 5, label: "Mayo" },
        { value: 6, label: "Junio" },
        { value: 7, label: "Julio" },
        { value: 8, label: "Agosto" },
        { value: 9, label: "Septiembre" },
        { value: 10, label: "Octubre" },
        { value: 11, label: "Noviembre" },
        { value: 12, label: "Diciembre" }
    ],
    en: [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" }
    ]
};

export function MonthSelector({ value, locale = 'es' }: MonthSelectorProps) {
    const [{ month }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });

    const currentDate = now(TIME_ZONE);
    const [selectedMonth, setSelectedMonth] = useState<number>(
        value?.month !== undefined ? value.month : currentDate.month
    );

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        if (event.target.value) {
            const newMonth = parseInt(event.target.value, 10);
            setSelectedMonth(newMonth);
            setCoordinates({ month: newMonth });
            return;
        }
        setCoordinates({ month: null });
    };

    return (
            <Select
                size='sm'
                radius='sm'
                aria-label="Selecciona el mes"
                label="Selecciona el mes"
                onChange={handleMonthChange}
                // classNames={{
                //     trigger: "backdrop-blur-xl",
                //     listbox: "overflow-y-auto backdrop-blur-xl"
                // }}
                // scrollShadowProps={{
                //     isEnabled: false,
                // }}
            >
                {MONTHS[locale].map((monthName, index) => (
                    <SelectItem key={(monthName.value).toString()} value={(monthName.value).toString()}>
                        {monthName.label}
                    </SelectItem>
                ))}
            </Select>
    );
}

export default MonthSelector;
