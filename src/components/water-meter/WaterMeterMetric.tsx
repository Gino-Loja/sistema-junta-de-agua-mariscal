'use client'
import React from "react";

import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

  


export default function WaterMeterMetric({ data, label, colors }: { data: { name: string, value: number }[], label: string, colors: string[] }) {
    return (
        <div className="grid grid-cols-2 gap-6">
            {
                data.map((item, index) => (
                    <Card   key={index}  className={`p-4 rounded-xl shadow-md border}`}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-base text-default-500">{label}</p>
                        </CardHeader>
                        <Divider />
                        <CardBody className="overflow-visible">
                            <div className="transition duration-700 ease-in-out h-full hover:scale-110  cursor-pointer   flex flex-col items-center justify-center">

                                <h4 className={`text-4xl lg:text-6xl font-bold ${colors[index]}`}>  {item.value}</h4>
                                <p className="text-muted-foreground">{item.name}</p>
                            </div>
                        </CardBody>
                    </Card>
                ))
            }
        </div>
    );
}


