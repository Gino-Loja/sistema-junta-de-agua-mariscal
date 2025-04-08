"use client"

import React, { useMemo } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, Bar } from 'recharts';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { monthsInSpanish } from '@/model/types';

interface InputData {
    mes: Date;
    sector_nombre: string;
    total_recaudado: number;
    total_deuda: number;
}

interface TransformedData {
    mes: Date;
    [key: string]: Date | number;
}

// Array de colores para asignar a cada sector
const SECTOR_COLORS = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
    '#1abc9c', '#34495e', '#16a085', '#27ae60', '#2980b9',
    '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c',
    '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b'
];

export function SheetsBarChart({ data }: { data: InputData[] }) {
    const { theme } = useTheme();

    // Extraer nombres de sectores únicos
    const sectorNames = useMemo(() => Array.from(new Set(data.map(item => item.sector_nombre))), [data]);

    const [activeChart, setActiveChart] = React.useState<string>(sectorNames[0]);

    // Mapeo de colores por sector
    const sectorColorMap = useMemo(() => {
        return sectorNames.reduce((acc, sector, index) => {
            acc[sector] = SECTOR_COLORS[index % SECTOR_COLORS.length];
            return acc;
        }, {} as Record<string, string>);
    }, [sectorNames]);

    // Totales acumulados para total recaudado
    const totalBySector = useMemo(() => {
        const totals: { [key: string]: number } = {};
        data.forEach(item => {
            totals[item.sector_nombre] = (totals[item.sector_nombre] || 0) + item.total_recaudado;
        });
        return totals;
    }, [data]);

    // Totales acumulados para total deuda
    const totalDeudaBySector = useMemo(() => {
        const totals: { [key: string]: number } = {};
        data.forEach(item => {
            totals[item.sector_nombre] = (totals[item.sector_nombre] || 0) + item.total_deuda;
        });
        return totals;
    }, [data]);

    // Transformamos los datos para incluir ambas métricas por fecha y sector.
    const transformData = (data: InputData[]): TransformedData[] => {
        const result: { [key: string]: TransformedData } = {};
        data.forEach(({ mes, sector_nombre, total_recaudado, total_deuda }) => {
            const fechaKey = mes.toISOString().split('T')[0];
            if (!result[fechaKey]) {
                result[fechaKey] = { mes };
            }
            result[fechaKey][`${sector_nombre}_recaudado`] = total_recaudado;
            result[fechaKey][`${sector_nombre}_deuda`] = total_deuda;
        });
        return Object.values(result);
    };

    const transformedData = transformData(data);

    // Tooltip personalizado para mostrar ambas métricas
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const date = new Date(label);
            const monthInSpanish = monthsInSpanish[date.getMonth()];
            const year = date.getFullYear();
            return (
                <div className="bg-background p-2 rounded shadow-md border">
                    <p className="font-bold">{`${monthInSpanish} ${year}`}</p>
                    {payload.map((pld: any) => {
                        const [sector, metric] = pld.name.split('_');
                        const labelMetric = metric === 'recaudado' ? 'Recaudado' : 'Deuda';
                        return (
                            <p key={pld.name} style={{ color: pld.color }}>
                                {`${sector} ${labelMetric}: $${pld.value.toFixed(2)}`}
                            </p>
                        );
                    })}
                </div>
            );
        }
        return null;
    };



    return (
        <div className="h-96 grid grid-cols-1">
            <Card shadow="sm">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 ">
                        <span className="text-default-900 text-xl font-semibold justify-self-start">
                            Recaudación Anual
                        </span>
                        <p className="text-base text-default-500">
                            Registro de ingresos totales y deudas correspondientes a los sectores por mes.
                        </p>
                    </div>
                    <div className="flex flex-wrap">
                        {sectorNames.map((key) => (
                            <button
                                key={key}
                                className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t text-left even:border-l sm:border sm:border-t-0 sm:px-8 sm:py-6 transition-colors duration-200 ${activeChart === key ? 'active' : ''}`}
                                style={{ backgroundColor: activeChart === key ? sectorColorMap[key] : undefined }}
                                onClick={() => setActiveChart(key)}
                            >
                                <span className="text-sm text-muted-foreground">{key}</span>
                                {/* <span className="text-md font-bold leading-none sm:text-xl">
                                    ${totalBySector[key].toFixed(2)} / ${totalDeudaBySector[key].toFixed(2)}
                                </span> */}
                                <div className="flex flex-col">
                                    <span className='text-xl font-bold' >
                                        ${totalBySector[key].toFixed(2)}
                                    </span>
                                    <span className='text-foreground'>
                                        / ${totalDeudaBySector[key].toFixed(2)}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardBody className="flex flex-col items-center justify-center mt-0">
                    <ResponsiveContainer width="100%" height="90%">



                        <ComposedChart

                            data={transformedData}
                            margin={{ left: 0, right: 12, top: 5 }}

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
                                <React.Fragment key={sector}>
                                    {/* Línea para total recaudado */}

                                    <Area
                                        key={`${sector}_deuda`}
                                        type="monotone"
                                        dataKey={`${sector}_deuda`}
                                        stroke={"#F9C97C"}
                                        dot={{ fill: "#F9C97C", r: 4 }}
                                        activeDot={{ r: 6, fill: "#F9C97C", stroke: 'white', strokeWidth: 2 }}
                                        hide={activeChart !== sector}
                                        fill='#F9C97C'
                                    />
                                    <Bar
                                        key={`${sector}_recaudado`}
                                        dataKey={`${sector}_recaudado`}
                                        //stroke={sectorColorMap[sector]}
                                        fill={sectorColorMap[sector]}
                                        hide={activeChart !== sector}
                                        barSize={25}
                                    />

                                    {/* Línea para total deuda con línea discontinua */}

                                </React.Fragment>
                            ))}
                            <Tooltip
                                content={<CustomTooltip />}
                                contentStyle={{
                                    backgroundColor: theme === 'dark' ? 'var(--background)' : 'white',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                }}
                            />
                            {/* <Legend 
                                verticalAlign="top"                        
                                height={36}
                                wrapperStyle={{
                                    lineHeight: '18px',
                                    position: 'relative',
                                    bottom: 0,
                                }}
                                 
                           
                            /> */}
                        </ComposedChart>

                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div>
    );
}
