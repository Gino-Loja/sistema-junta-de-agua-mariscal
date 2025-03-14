import {
  Card, CardBody, CardHeader,
  Divider
} from "@nextui-org/react";
import React from "react";
import { createApiLecturesRepository } from "@/services/serviceMeasurement";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import LecturePieChart from "./MeasurementPieChart";

import { QueryParams } from "@/modules/types";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default async function MeasurementMetrics({ year, month }: Omit<QueryParams, "page" | "per_page" | "date" | "from" | "to">) {

  const lectureRepository: ILecturesRepository = createApiLecturesRepository();
  const consumedMeters = await lectureRepository.getComsumedMetersByMonths(month, year);
  const consumedBySector = await lectureRepository.getConsumedBySector(year, month);
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="border" >
        <CardHeader className="grid grid-cols-1 gap-2" >
          <span className="text-default-900 text-xl font-semibold justify-self-start">
            {" "}
            Consumo de {months[month-1]}
          </span>

          <p className="text-base text-default-500 ">Consumo total de metros cúbicos en {months[month-1]} </p>

        </CardHeader>
        <Divider></Divider>

        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="transition duration-700 ease-in-out  hover:scale-110 bg-primary-300 cursor-pointer rounded-xl border-2 shadow-md px-4 py-5 w-1/2 flex flex-col items-center justify-center">
            {" "}
            <h4 className="text-4xl md:text-center font-bold">{consumedMeters.success && consumedMeters.data.consumo ? consumedMeters.data.consumo : 0}</h4>
            <p className="text-muted-fx`oreground md:text-center">Total de m³</p>
          </div>
        </CardBody>
      </Card>
      <Card className="border"   >
        <CardHeader className="grid grid-cols-1 gap-2" >
          <span className="text-default-900 text-xl font-semibold justify-self-start">
            {" "}
            Consumo de Sectores

          </span>

          <p className="text-base text-default-500 ">Consumo total de metros cúbicos de cada Sector </p>

        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 overflow-hidden">
          <div className="transition duration-700 ease-in-out hover:scale-110 min-w-72 min-h-36 flex flex-col items-center justify-center" >
            {consumedBySector.success && <LecturePieChart sectors={consumedBySector.data}></LecturePieChart>}
          </div>
        </CardBody>
      </Card>
      <Card className="border"  >
        <CardHeader className="grid grid-cols-1 gap-2" >
          <span className="text-default-900 text-xl font-semibold justify-self-start">
            {" "}
            Exceso de {months[month-1]}

          </span>

          <p className="text-base text-default-500 ">Exceso total registrado en {months[month-1]} </p>

        </CardHeader>
        <Divider></Divider>
        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="transition duration-700 ease-in-out  hover:scale-110 bg-warning-300 cursor-pointer rounded-xl border-2 shadow-md px-4 py-5 w-1/2 flex flex-col items-center justify-center">
            {" "}
            <h4 className="text-4xl font-bold">{consumedMeters.success && consumedMeters.data.exceso ? consumedMeters.data.exceso : 0}</h4>
            <p className="text-muted-fx`oreground">Total de m³</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}           