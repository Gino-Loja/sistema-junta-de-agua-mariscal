"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";

export default function BarChartSkeleton() {
  return (
    <div className="m-5 h-96 grid grid-cols-1">
      <Card>
        {/* Header de la tarjeta */}
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <Skeleton className="h-6 w-48 rounded-lg" /> {/* Título del gráfico */}
            <Skeleton className="h-4 w-72 rounded-lg" /> {/* Descripción */}
          </div>
          {/* Botones de sectores */}
          <div className="flex flex-wrap">
            <Skeleton className="h-16 w-32 rounded-lg m-1" /> {/* Sector 1 */}
            <Skeleton className="h-16 w-32 rounded-lg m-1" /> {/* Sector 2 */}
            <Skeleton className="h-16 w-32 rounded-lg m-1" /> {/* Sector 3 */}
            <Skeleton className="h-16 w-32 rounded-lg m-1" /> {/* Sector 4 */}
          </div>
        </CardHeader>

        {/* Cuerpo de la tarjeta (gráfico de líneas) */}
        <CardBody className="flex flex-col items-center justify-center mt-0">
          <div className="w-full h-72 flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-lg" /> {/* Placeholder para el gráfico */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
