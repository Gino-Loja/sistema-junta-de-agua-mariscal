'use client'
import React, { useState, useEffect } from 'react';
import { Button, Select, SelectItem, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { ChevronDown } from 'lucide-react';
import { now } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useQueryStates } from 'nuqs';
import { coordinatesParsers } from '@/modules/searchParams';
import { TIME_ZONE } from '@/model/Definitions';

interface MonthYearSelectorProps {
    value?: { month: number; year: number };
    className?: string;
    locale?: 'en' | 'es';
    yearRange?: { start: number; end: number };
    viewMonth?: boolean;
}


export function MonthYearSelector({
    value,
    className,
    locale = 'es',
    yearRange = { start: 2021, end: now(TIME_ZONE).year },
    viewMonth = true
}: MonthYearSelectorProps) {

    const [{ month, year }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });


    const currentDate = now(TIME_ZONE);
    const [selectedMonth, setSelectedMonth] = useState<number>(
        value?.month !== undefined ? value.month - 1 : currentDate.month - 1// Adjust for 0-based index
    );

    const [selectedYear, setSelectedYear] = useState<number>(
        value?.year !== undefined ? value.year : currentDate.year
    );
    const [isOpen, setIsOpen] = useState(false);

    // Generate years array
    const years = Array.from(
        { length: yearRange.end - yearRange.start + 1 },
        (_, i) => yearRange.start + i
    );

    // Generate months
    const months = Array.from({ length: 12 }, (_, i) => i);

    useEffect(() => {
        if (value?.month !== undefined && value?.year !== undefined) {
            setSelectedMonth(value.month);
            setSelectedYear(value.year);
        }
    }, [value]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(event.target.value, 10);
        setSelectedMonth(newMonth);
        setCoordinates({ month: newMonth + 1, from: null, to: null })
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(event.target.value, 10);

        setSelectedYear(newYear);
        setCoordinates({ year: newYear, from: null, to: null })
    };

    const resetFilter = () => {
        setSelectedMonth(currentDate.month - 1);
        setSelectedYear(currentDate.year);
        setCoordinates({ month: null, year: null })
    };

    // Get month names using the provided locale
    const getMonthName = (monthIndex: number, localeCode: string = 'es-EC') => {
        // Crear la fecha con el día 1 para evitar desbordes
        const date = new Date(now(TIME_ZONE).year, 0, 1);
        date.setMonth(monthIndex);
        return date.toLocaleString(localeCode, { month: 'long' });
    };


    const formattedDate = () => {
        const localeCode = locale === 'es' ? 'es-EC' : 'en-US';
        const date = new Date(now(TIME_ZONE).toDate());
        date.setMonth(selectedMonth);
        date.setFullYear(selectedYear);

        if (!viewMonth) {
            return date.toLocaleString(localeCode, {
                year: 'numeric'
            });
        }

        return date.toLocaleString(localeCode, {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <I18nProvider locale={locale === 'es' ? 'es-EC' : 'en-US'}>
            <Popover
                isOpen={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
                placement="bottom"

            >


                <PopoverTrigger>
                    <Button
                        variant="bordered"
                        className={`w-full justify-between  rounded-xl transition-all duration-300  ${className}`}
                        endContent={
                            <ChevronDown
                                className={`ml-2 h-4 w-4  transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                            />
                        }
                    >
                        <span className="flex items-center gap-2">
                            <span className="capitalize font-medium">{formattedDate()}</span>
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-2 backdrop-blur-xl rounded-xl">

                    <div className="w-full flex flex-col gap-4">
                        {
                            viewMonth && <div className="space-y-2 w-full">
                                <p className="text-sm font-medium text-default-500">
                                    {locale === 'es' ? 'Mes' : 'Month'}
                                </p>
                                <Select
                                    disallowEmptySelection
                                    aria-label="Selecciona el mes"
                                    selectedKeys={[selectedMonth.toString()]}
                                    onChange={handleMonthChange}
                                    className="capitalize"
                                    classNames={{
                                        trigger: " backdrop-blur-xl",
                                        listbox: "max-h-80 overflow-y-auto  backdrop-blur-xl"
                                    }}
                                >
                                    {months.map((month) => (
                                        <SelectItem key={month.toString()} value={month} className="capitalize">
                                            {getMonthName(month, locale === 'es' ? 'es-EC' : 'en-US')}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        }

                        <div className="space-y-2 ">
                            <p className="text-sm font-medium text-default-500">
                                {locale === 'es' ? 'Año' : 'Year'}
                            </p>
                            <Select
                                disallowEmptySelection
                                aria-label="Selecciona el año"
                                selectedKeys={[selectedYear.toString()]}
                                onChange={handleYearChange}
                                classNames={{
                                    trigger: " backdrop-blur-xl",
                                    listbox: "max-h-80 overflow-y-auto  backdrop-blur-xl"
                                }}
                            >
                                {years.map((year) => (
                                    <SelectItem key={year.toString()} value={year.toString()}>
                                        {year.toString()}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        {
                            (selectedYear || selectedMonth) && <Button
                                variant="bordered"
                                size='sm'
                                className=" justify-between "
                                onPress={() => {
                                    resetFilter()
                                }}

                            >
                                <span className="flex items-center gap-2">
                                    <span className="capitalize font-medium">Limpiar filtro</span>
                                </span>
                            </Button>
                        }
                    </div>

                </PopoverContent>
            </Popover>
        </I18nProvider>
    );
}

export default MonthYearSelector;