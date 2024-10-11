import {
  Card, CardBody, CardHeader,
  Divider, Progress
} from "@nextui-org/react";
import React from "react";

import { ISheetsRepository } from "@/model/sheets-repository/sheetsRepository";
import { createApiSheetsRepository } from "@/services/serviceSheets";
import SheetsPieChart from "./SheetPieChart";
import { monthsInSpanish } from "@/model/types";

export default async function MetricSheets({ params }: { params: string }) {
  const sheetsRepository: ISheetsRepository = createApiSheetsRepository();
  const calculeRevenue = await sheetsRepository.getCalculateMonthlyRevenue(params);
  const revenueBySector = await sheetsRepository.getRevenueBySector(params);
  const percentageRevenueByStatus = await sheetsRepository.percentageRevenueByStatus(params);
  ///console.log(revenueBySector)
  const date = new Date(params);

  return (
    <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border" >
        <CardHeader className="grid grid-cols-1 gap-2 p-6" >
          <span className="text-default-900 text-xl font-semibold justify-self-start">
            {" "}
            Recaudado en {monthsInSpanish[date.getMonth()]}

          </span>

          <p className="text-base text-default-500 ">Ingresos totales recibidos en {monthsInSpanish[date.getMonth()]} </p>

        </CardHeader>
        <Divider></Divider>

        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="transition duration-700 ease-in-out  hover:scale-110  cursor-pointer  px-4 py-5  flex flex-col w-96">
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
                  className="max-w-md"
                />

                <p className="text-sm text-default-500 mt-2 self-start">
                  {((calculeRevenue.data.total_recaudado / calculeRevenue.data.total_pagar) * 100).toFixed(2)} % del objetivo alcanzado
                </p>
              </>

            }

          </div>
        </CardBody>
      </Card>
      <Card className="border"   >
        <CardHeader className="grid grid-cols-1 gap-2 p-6" >
          <span className="text-default-900 text-xl font-semibold justify-self-start">
            {" "}
            Recaudado en Sectores
          </span>

          <p className="text-base text-default-500 ">Consumo total de metros cúbicos de cada Sector </p>

        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 overflow-hidden">
          <div className="transition duration-700 ease-in-out hover:scale-110 min-w-72 min-h-36 flex flex-col items-center justify-center" >
            {revenueBySector.success && <SheetsPieChart sectors={revenueBySector.data}></SheetsPieChart>}
          </div>
        </CardBody>
      </Card>
      <Card className="border"  >
        <CardHeader className="grid grid-cols-1 gap-2 p-6" >
          <span className="text-default-900 text-xl font-semibold justify-self-start">
            {" "}
            Planillas pagadas en {monthsInSpanish[date.getMonth()]}

          </span>

          <p className="text-base text-default-500 ">Total de planillas pagadas durante en {monthsInSpanish[date.getMonth()]} </p>

        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="transition duration-700 ease-in-out  hover:scale-110  cursor-pointer   flex flex-col items-center justify-center">

            <h4 className="text-4xl font-bold">  {percentageRevenueByStatus.success && percentageRevenueByStatus.data.porcentaje_planilla_pagadas} %</h4>
            <p className="text-muted-fx`oreground">Planillas pagadas</p>
          </div>
        </CardBody>
      </Card>

    </div>
  );
}           