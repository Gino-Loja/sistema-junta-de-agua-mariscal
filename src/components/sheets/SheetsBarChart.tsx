"use client"

import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useMemo } from 'react';
import { monthsInSpanish } from '@/model/types';

interface InputData {
    mes: Date;
    sector_nombre: string;
    total_recaudado: number;
}

interface TransformedData {
    mes: Date;
    [sector: string]: Date | number;
}

// Array of colors to be used for sectors
const SECTOR_COLORS = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
    '#1abc9c', '#34495e', '#16a085', '#27ae60', '#2980b9',
    '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c',
    '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b'
];




export function SheetsBarChart({ data }: { data: InputData[] }) {
    const { theme } = useTheme();

    const sectorNames = useMemo(() => Array.from(new Set(data.map(item => item.sector_nombre))), [data]);

    const [activeChart, setActiveChart] = React.useState<string>(sectorNames[0]);
    const sectorColorMap = useMemo(() => {
        return sectorNames.reduce((acc, sector, index) => {
            acc[sector] = SECTOR_COLORS[index % SECTOR_COLORS.length];
            return acc;
        }, {} as Record<string, string>);
    }, [sectorNames]);
    const totalBySector = useMemo(() => {
        const totals: { [key: string]: number } = {};
        data.forEach(item => {
            if (totals[item.sector_nombre]) {
                totals[item.sector_nombre] += item.total_recaudado;
            } else {
                totals[item.sector_nombre] = item.total_recaudado;
            }
        });
        return totals;
    }, [data]);

    const transformData = (data: InputData[]): TransformedData[] => {
        const result: { [key: string]: TransformedData } = {};

        data.forEach(({ mes, sector_nombre, total_recaudado }) => {
            const fechaKey = mes.toISOString().split('T')[0];

            if (!result[fechaKey]) {
                result[fechaKey] = { mes: mes };
            }

            result[fechaKey][sector_nombre] = total_recaudado;
        });

        return Object.values(result);
    };

    const transformedData = transformData(data);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const date = new Date(label);
            const monthInSpanish = monthsInSpanish[date.getMonth()];
            const year = date.getFullYear();
            return (
                <div className="bg-background p-2 rounded shadow-md border ">
                    <p className="font-bold">{`${monthInSpanish} ${year}`}</p>
                    {payload.map((pld: any) => (
                        <p key={pld.name} style={{ color: pld.color }}>
                            {`${pld.name}: $${pld.value.toFixed(2)}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-96 grid grid-cols-1">
            <Card>
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <span className="text-default-900 text-xl font-semibold justify-self-start">
                            Recaudacion Anual                        
                        </span>
                        <p className="text-base text-default-500">Registro del los ingresos totales correspondientes a los sectores por mes</p>
                    </div>
                    <div className="flex flex-wrap">
                        {sectorNames.map((key) => (
                            <button
                                key={key}
                                className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6 transition-colors duration-200 ${activeChart === key}`}

                                style={{
                                    backgroundColor: activeChart === key ? sectorColorMap[key] : undefined
                                }}
                                onClick={() => setActiveChart(key)}
                            >
                                <span className="text-sm text-muted-foreground">
                                    {key}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    ${totalBySector[key].toFixed(2)}
                                </span>
                            </button>
                        ))}
                    </div>
                </CardHeader>

                <CardBody className="flex flex-col items-center justify-center mt-0">
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart
                            data={transformedData}
                            margin={{
                                left: 12,
                                right: 12,
                                top: 5,
                            }}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <YAxis />
                            <XAxis
                                dataKey="mes"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return monthsInSpanish[date.getMonth()].substring(0, 3);
                                }}
                            />
                            {sectorNames.map((sector) => (
                                <Line
                                    key={sector}
                                    type="linear"
                                    dataKey={sector}
                                    stroke={sectorColorMap[sector]}
                                    strokeWidth={2}
                                    dot={{ fill: sectorColorMap[sector], r: 4 }}
                                    activeDot={{ r: 6, fill: sectorColorMap[sector], stroke: 'white', strokeWidth: 2 }}
                                    hide={activeChart !== sector}
                                />
                            ))}
                            <Tooltip
                                content={<CustomTooltip />}
                                contentStyle={{
                                    backgroundColor: theme === 'dark' ? 'var(--background)' : 'white',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                }}
                            />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div>
    );
}