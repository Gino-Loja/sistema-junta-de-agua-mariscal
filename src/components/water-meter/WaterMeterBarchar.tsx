'use client'
import { Card } from "@nextui-org/react";
import React from "react";
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                <p className="text-sm font-medium text-gray-600">{`Tipo: ${label}`}</p>
                <p className="text-lg font-bold text-primary">
                    {`Cantidad: ${payload[0].value}`}
                </p>
            </div>
        );
    }
    return null;
};

export default function WaterMeterBarchar({ data }: { data: { tipo: string, cantidad: number }[] }) {

    return (
        <Card  radius="sm" shadow="none" className="p-6 h-full transition-all duration-300 hover:shadow-md shadow border">
            <div className="space-y-2 mb-6">
                <h4 className="text-2xl font-bold tracking-tight">Medidores por tipo</h4>
                <p className="text-sm text-muted-foreground font-medium">
                    Distribución de cantidad de medidores por categoría
                </p>
            </div>
            
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            bottom: 20,
                            left: 20
                        }}
                        className="chart-animation"
                    >
                        <CartesianGrid 
                            stroke="#E5E7EB" 
                            strokeDasharray="3 3" 
                            horizontal={true}
                            vertical={true}
                        />
                        <XAxis 
                            type="number"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#E5E7EB' }}
                        />
                        <YAxis 
                            dataKey="tipo" 
                            type="category"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#E5E7EB' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                            wrapperStyle={{
                                paddingTop: "20px"
                            }}
                        />
                        <Bar 
                            dataKey="cantidad" 
                            barSize={30}
                            fill="url(#colorGradient)"
                            radius={[0, 4, 4, 0]}
                            className="bar-animation"
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#9b87f5" />
                                <stop offset="100%" stopColor="#7E69AB" />
                            </linearGradient>
                        </defs>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}