'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    Card, CardBody, CardHeader
} from "@nextui-org/react";
export function LectureBarChart({ data }: { data: { mes: string, consumo_total: number, exceso_total: number }[] }) {
    return (
        <div className="m-5 h-96 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <Card >

                <CardHeader className="flex flex-col items-center justify-center mt-4" >
                    <div className="flex flex-col border-dashed border-2 border-divider rounded-xl p-3">
                        <span className="text-default-900 text-xl font-semibold">
                            {" "}
                            Consumo Anual
                        </span>
                    </div>
                </CardHeader>

                <CardBody className="flex flex-col items-center justify-center mt-0 ">

                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart

                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="consumo_total" stackId="a" fill="#8884d8" />
                            <Bar dataKey="exceso_total" stackId="a" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div>
    )

}   