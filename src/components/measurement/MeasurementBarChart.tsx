'use client'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import {
    Card, CardBody, CardHeader,
    Divider
} from "@nextui-org/react";
import { useTheme } from "next-themes";

export function MeasurementBarChart({ data }: { data: { mes: string, consumo_total: number, exceso_total: number }[] }) {
    const { theme } = useTheme()

    return (
        <div className="h-96 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            <Card >

                <CardHeader className="grid grid-cols-1 gap-2 p-6" >
                    <span className="text-default-900 text-xl font-semibold justify-self-start">
                        {" "}
                        Consumo de General

                    </span>

                    <p className="text-base text-default-500 ">Registro del consumo total de agua correspondiente a los sectores</p>

                </CardHeader>
                <Divider  ></Divider>


                <CardBody className="flex flex-col items-center justify-center mt-0 ">

                    <ResponsiveContainer width="100%" height="90%">
                        <AreaChart

                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                            }}

                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" style={{ fill: theme == 'dark' ? "#FFFFFF" : "#000000" }} />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: '#ffffff', color: '#000000' }} />
                            <Legend />
                            <Area type="monotone" dataKey="consumo_total" stackId="1" stroke="#66AAF9" fill="#66AAF9" />

                            <Area type="monotone" dataKey="exceso_total" stackId="1" stroke="#F7B750" fill="#F7B750" />
                           


                        </AreaChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div>
    )

}   