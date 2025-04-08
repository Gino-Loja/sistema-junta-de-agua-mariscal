'use client'
import React, { useState, useEffect } from 'react';
import { Button, Select, SelectItem, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { ChevronDown } from 'lucide-react';
import { now, getWeeksInMonth, getDayOfWeek } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useQueryStates } from 'nuqs';
import { coordinatesParsers } from '@/modules/searchParams';
import { TIME_ZONE } from '@/model/Definitions';

interface MonthYearSelectorProps {
    value?: { month: number; year: number };

    locale?: 'en' | 'es';
    yearRange?: { start: number; end: number };

}


export function YearSelector({
    value,
    locale = 'es',
    yearRange = { start: 2021, end: now(TIME_ZONE).year },
}: MonthYearSelectorProps) {

    const [{ month, year }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });


    const currentDate = now(TIME_ZONE);


    const [selectedYear, setSelectedYear] = useState<number>(
        value?.year !== undefined ? value.year : currentDate.year
    );
    // Generate years array
    const years = Array.from(
        { length: yearRange.end - yearRange.start + 1 },
        (_, i) => yearRange.start + i
    );

    // Generate months

    useEffect(() => {
        if (value?.year !== undefined) {
            setSelectedYear(value.year);
        }
    }, [value]);



    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(event.target.value, 10);
        setSelectedYear(newYear);
        setCoordinates({ year: newYear, from: null, to: null })
    };
    return (
        <I18nProvider locale={locale === 'es' ? 'es-EC' : 'en-US'}>
            <div className="flex flex-row-reverse">
                  
                    <Select
                        radius='sm'
                        size='sm'
                        disallowEmptySelection
                        aria-label="Selecciona el año"
                        label="Selecciona el año"
                        selectedKeys={[selectedYear.toString()]}
                        
                        onChange={handleYearChange}
                        classNames={{
                            trigger: " backdrop-blur-xl",
                            listbox: "max-h-80 overflow-y-auto  backdrop-blur-xl",
                            base: "max-w-52",
                        }}
                    >
                        {years.map((year) => (
                            <SelectItem key={year.toString()} value={year.toString()}>
                                {year.toString()}
                            </SelectItem>
                        ))}
                    </Select>
                
            </div>

        </I18nProvider>
    );
}

export default YearSelector;