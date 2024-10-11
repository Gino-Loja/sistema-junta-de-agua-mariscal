import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";

export const SkeletonMetricUser = () => {
    return (
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skeleton para Numero de Usuarios */}
            <Card>
                <CardHeader className="flex flex-col items-center justify-center p-6">
                    <Skeleton className="w-full rounded-xl border-dashed border-2 border-divider py-2 px-6">
                        <div className="h-6 bg-default-200 rounded-lg"></div>
                    </Skeleton>
                </CardHeader>
                <CardBody className="flex flex-col items-center justify-center mt-0 pt-0 pb-6">
                    <Skeleton className="w-1/2 rounded-xl border-2 px-4 py-5">
                        <div className="h-10 bg-default-200 rounded-lg"></div>
                        <div className="mt-2 h-4 bg-default-200 rounded-lg"></div>
                    </Skeleton>
                </CardBody>
            </Card>

            {/* Skeleton para Numero de Activos e Inactivos */}
            <Card>
                <CardHeader className="flex flex-col items-center justify-center p-6">
                    <Skeleton className="w-full rounded-xl border-dashed border-2 border-divider py-2 px-6">
                        <div className="h-6 bg-default-200 rounded-lg"></div>
                    </Skeleton>
                </CardHeader>
                <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <Skeleton className="w-32 rounded-xl border-2 px-4 py-5">
                            <div className="h-10 bg-default-200 rounded-lg"></div>
                            <div className="mt-2 h-4 bg-default-200 rounded-lg"></div>
                        </Skeleton>
                        <Skeleton className="w-32 rounded-xl border-2 px-4 py-5">
                            <div className="h-10 bg-default-200 rounded-lg"></div>
                            <div className="mt-2 h-4 bg-default-200 rounded-lg"></div>
                        </Skeleton>
                    </div>
                </CardBody>
            </Card>

            {/* Skeleton para Numero de Usuarios por Sector */}
            <Card>
                <CardHeader className="flex flex-col items-center justify-center p-6">
                    <Skeleton className="w-full rounded-xl border-dashed border-2 border-divider py-2 px-6">
                        <div className="h-6 bg-default-200 rounded-lg"></div>
                    </Skeleton>
                </CardHeader>
                <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <Skeleton className="w-32 rounded-xl border-2 px-4 py-5">
                            <div className="h-10 bg-default-200 rounded-lg"></div>
                            <div className="mt-2 h-4 bg-default-200 rounded-lg"></div>
                        </Skeleton>
                        <Skeleton className="w-32 rounded-xl border-2 px-4 py-5">
                            <div className="h-10 bg-default-200 rounded-lg"></div>
                            <div className="mt-2 h-4 bg-default-200 rounded-lg"></div>
                        </Skeleton>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};