'use client'
import React from "react";

import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";




export default function WaterMeterMetric({ data, label, colors }: { data: { name: string, value: number }[], label: string, colors: string[] }) {
    return (
        <div className="grid grid-cols-2 gap-6">
            {
                data.map((item, index) => (
                    // <Card   key={index}  className={`p-4 rounded-xl border}`}>
                    //     <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    //         <p className="text-base text-default-500">{label}</p>
                    //     </CardHeader>
                    //     <Divider />
                    //     <CardBody className="overflow-visible">
                    //         <div className="transition duration-700 ease-in-out h-full hover:scale-110  cursor-pointer   flex flex-col items-center justify-center">

                    //             <h4 className={`text-4xl lg:text-6xl font-bold }`}>  {item.value}</h4>
                    //             <p className="text-muted-foreground">{item.name}</p>
                    //         </div>
                    //     </CardBody>
                    // </Card>

                   
                    <div
                        key={index}
                        className="rounded-lg border-1  shadow-sm p-6 transition-all duration-300 ease-in-out hover:border-gray-300  hover:shadow-md flex flex-col h-40"
                        aria-label={`${item.name} statistics`}
                    >

                        <div className="flex items-center space-x-3">
                            <div className={`h-3 w-3 rounded-full ${colors[index]}`}></div>
                            <h2 className="text-lg font-medium">{item.name}</h2>
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                            <p className="text-4xl font-semibold tracking-tight  ">
                                {item.value.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}


