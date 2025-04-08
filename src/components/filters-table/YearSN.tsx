'use client'
import React, { useState, useEffect } from 'react';
import { Select, SelectItem, } from "@nextui-org/react";
import { now } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useQueryStates } from 'nuqs';
import { coordinatesParsers } from '@/modules/searchParams';
import { TIME_ZONE } from '@/model/Definitions';

interface MonthYearSelectorProps {
    value?: { month: number; year: number };

    locale?: 'en' | 'es';
    yearRange?: { start: number; end: number };

}


export function YearSN({
    value,
    locale = 'es',
    yearRange = { start: 2021, end: now(TIME_ZONE).year },
}: MonthYearSelectorProps) {

    const [{ month, yr }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });


    const currentDate = now(TIME_ZONE);


    const [selectedYear, setSelectedYear] = useState<number | null>(
        yr
    );
    // Generate years array
    const years = Array.from(
        { length: yearRange.end - yearRange.start + 1 },
        (_, i) => yearRange.start + i
    );


    useEffect(() => {
        if (yr !== null) {
            setSelectedYear(yr);
        }
    }, [yr]);


    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        if (event.target.value) {
            const newYear = parseInt(event.target.value, 10);
            setSelectedYear(newYear);
            setCoordinates({ yr: newYear, from: null, to: null })
            return;
        }
        setCoordinates({ yr: null, from: null, to: null })
        setSelectedYear(null);

    };
    return (
        <I18nProvider locale={locale === 'es' ? 'es-EC' : 'en-US'}>
                <Select
                    radius='sm'
                    size='sm'
                    aria-label="Selecciona el año"
                    label="Selecciona el año"
                    //defaultSelectedKeys={[selectedYear !== null ? selectedYear.toString() : ""]}
                    onChange={handleYearChange}
                    
                >
                    {years.map((year) => (
                        <SelectItem key={year.toString()} value={year.toString()}>
                            {year.toString()}
                        </SelectItem>
                    ))}
                </Select>


        </I18nProvider>
    );
}

export default YearSN;