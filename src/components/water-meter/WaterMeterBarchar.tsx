'use client'
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
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";


export default function WaterMeterBarchar({ data }: { data: { tipo: string, cantidad: number }[] }) {
    return (
        <Card className="py-4 h-full">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Medidores por tipo</h4>
                <p className="text-tiny uppercase font-bold mb-1">cantidad de medidores</p>
            </CardHeader>
            <CardBody >
                <ResponsiveContainer minHeight={300} width="100%" height="100%">
                <ComposedChart
                       layout="vertical"
                       data={data}
                       margin={{
                           top: 20,
                           right: 20,
                           bottom: 20,
                           left: 25
                       }}
                   >
                       <CartesianGrid stroke="#f5f5f5" />
                       <XAxis type="number" />
                       <YAxis dataKey="tipo" type="category" />
                       <Tooltip />
                       <Legend />
                       <Bar dataKey="cantidad" barSize={50} fill="#413ea0" />
                   </ComposedChart>
                </ResponsiveContainer>
                    
            </CardBody>
        </Card>











    );
}
