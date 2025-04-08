import {
  Card, CardBody, CardHeader,
  Divider, Progress
} from "@nextui-org/react";
import React from "react";

import { ISheetsRepository } from "@/model/sheets-repository/sheetsRepository";
import { createApiSheetsRepository } from "@/services/serviceSheets";
import SheetsPieChart from "./SheetPieChart";
import { monthsInSpanish } from "@/model/types";

export default async function MetricSheets({ year, month }: { year: number, month: number }) {
  const sheetsRepository: ISheetsRepository = createApiSheetsRepository();
  const calculeRevenue = await sheetsRepository.getCalculateMonthlyRevenue(year, month);
  const revenueBySector = await sheetsRepository.getRevenueBySector(year, month);
  const percentageRevenueByStatus = await sheetsRepository.percentageRevenueByStatus(year, month);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto">
      <Card shadow="sm" >
        <CardHeader className="grid grid-cols-1 gap-1" >
          <span className="text-default-900 text-lg font-semibold justify-self-start">
            {" "}
            Planillas pendientes en {monthsInSpanish[month - 1]}
          </span>
          <p className="text-sm text-default-500 ">Total de planillas pagadas durante en {monthsInSpanish[month - 1]} </p>
        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-col items-center justify-center mt-0">
          <div className="cursor-pointer flex flex-col items-center justify-center">

            <h4 className="text-4xl font-bold">  {percentageRevenueByStatus.success && 100 - percentageRevenueByStatus.data.porcentaje_planilla_pagadas} %</h4>
            <p className="text-muted-fx`oreground">Planillas pendientes</p>
          </div>
        </CardBody>
      </Card>
      <Card shadow="sm" >
        <CardHeader className="grid grid-cols-1 gap-1" >
          <span className="text-default-900 text-lg font-semibold justify-self-start">
            {" "}
            Planillas pagadas en {monthsInSpanish[month - 1]}
          </span>
          <p className="text-sm text-default-500 ">Total de planillas pagadas durante en {monthsInSpanish[month - 1]} </p>
        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-col items-center justify-center mt-0">
          <div className="cursor-pointer flex flex-col items-center justify-center">
            <h4 className="text-4xl font-bold">  {percentageRevenueByStatus.success && percentageRevenueByStatus.data.porcentaje_planilla_pagadas} %</h4>
            <p className="text-muted-fx`oreground">Planillas pagadas</p>
          </div>
        </CardBody>
      </Card>
      <Card shadow="sm" className="col-span-1 sm:col-span-2 md:col-span-2" >
        <CardHeader className="grid grid-cols-1 gap-1" >
          <span className="text-default-900 text-lg font-semibold justify-self-start">
            {" "}
            Recaudado en {monthsInSpanish[month - 1]}
          </span>
          <p className="text-sm text-default-500 ">Ingresos totales recibidos en {monthsInSpanish[month - 1]} </p>
        </CardHeader>
        <Divider></Divider>

        <CardBody className="flex flex-col w-full justify-center mt-0">
          <div className="flex flex-col w-full">
            {" "}
            {
              calculeRevenue.success &&
              <>
                <span className="text-default-900 text-md font-semibold">
                  {" "}
                  Por cobrar ${calculeRevenue.data.total_pagar}
                </span>

                <Progress
                  label={`Total Cobrado`}
                  size="md"
                  value={calculeRevenue.data.total_recaudado}
                  maxValue={calculeRevenue.data.total_pagar}
                  color="success"
                  formatOptions={{ style: "currency", currency: "USD", }}
                  showValueLabel={true}
                  
                  className=""
                />

                <p className="text-sm text-default-500 mt-2 self-start">
                  {((calculeRevenue.data.total_recaudado / calculeRevenue.data.total_pagar) * 100).toFixed(2)} % del objetivo alcanzado
                </p>
              </>
            }
          </div>
        </CardBody>
      </Card>
      <Card shadow="sm" className="md:col-span-2 row-start-1 row-span-2"  >
        <CardHeader className="grid grid-cols-1 gap-1" >
          <span className="text-default-900 text-lg font-semibold justify-self-start">
            {" "}
            Recaudado en Sectores
          </span>
          <p className="text-sm text-default-500 ">Consumo total de metros cúbicos de cada Sector </p>
        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 overflow-hidden w-full">
          <div className="flex flex-col items-center justify-center w-full" >
            {revenueBySector.success && <SheetsPieChart sectors={revenueBySector.data}></SheetsPieChart>}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}           