'use client'

import React from "react";
import { Card, Skeleton } from "@nextui-org/react";
export default function SkeletonCustom() {
    return (
        <Card className="auto space-y-5 p-4 m-4" radius="lg">


            <Skeleton className="rounded-lg w-3/12  space-x-10 ">
                {/* Header de la tabla */}
                <div className="h-9 rounded-lg bg-default-300"></div>
            </Skeleton>


            <Skeleton className="rounded-lg space-x-10 ">
                {/* Header de la tabla */}
                <div className="h-10 rounded-lg bg-default-300"></div>
            </Skeleton>

            {/* Cuerpo de la tabla */}
            <div className="space-y-16">
                {/* Fila 1 */}
                <div className="flex justify-between space-x-10 ">
                    <Skeleton className="w-3/12 rounded-lg space-x-10">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/12 rounded-lg">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-3/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                </div>

                <div className="flex justify-between space-x-10 ">
                    <Skeleton className="w-3/12 rounded-lg space-x-10">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/12 rounded-lg">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-3/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                </div>

                {/* Fila 2 */}
                <div className="flex justify-between space-x-10">
                    <Skeleton className="w-3/12 rounded-lg">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/12 rounded-lg">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-3/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                </div>

                {/* Fila 3 */}
                <div className="flex justify-between space-x-10">
                    <Skeleton className="w-3/12 rounded-lg">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/12 rounded-lg">
                        <div className="h-6 bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-3/12 rounded-lg">
                        <div className="h-6 bg-default-300"></div>
                    </Skeleton>
                </div>
            </div>
        </Card>)
};