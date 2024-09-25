import {
  Card, CardBody, CardHeader
} from "@nextui-org/react";
import React from "react";
import { createApiLecturesRepository } from "@/services/serviceLectures";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import LecturePieChart from "./LecturePieChart";

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

export default async function MetricLectures({ params }: { params: string }) {

  const lectureRepository: ILecturesRepository = createApiLecturesRepository();
  const consumedMeters = await lectureRepository.getComsumedMetersByMonths(params);
  const consumedBySector = await lectureRepository.getConsumedBySector(params);
 // console.log(consumedBySector)
  const date = new Date(params);

  return (
    <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card  >
        <CardHeader className="flex flex-col items-center justify-center p-6" >
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              Consumo de {months[date.getMonth()]}
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="transition duration-700 ease-in-out  hover:scale-110 bg-primary-300 cursor-pointer rounded-xl border-2 shadow-md px-4 py-5 w-1/2 flex flex-col items-center justify-center">
            {" "}
            <h4 className="text-4xl md:text-center font-bold">{consumedMeters.success && consumedMeters.data.consumo ? consumedMeters.data.consumo : 0}</h4>
            <p className="text-muted-fx`oreground md:text-center">Total de m^3</p>
          </div>
        </CardBody>
      </Card>
      <Card  >
        <CardHeader className="flex flex-col items-center justify-center p-6" >
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              Exceso de {months[date.getMonth()]}
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="transition duration-700 ease-in-out  hover:scale-110 bg-warning-300 cursor-pointer rounded-xl border-2 shadow-md px-4 py-5 w-1/2 flex flex-col items-center justify-center">
            {" "}
            <h4 className="text-4xl font-bold">{consumedMeters.success && consumedMeters.data.exceso ? consumedMeters.data.exceso : 0}</h4>
            <p className="text-muted-fx`oreground">Total de m^3</p>
          </div>
        </CardBody>
      </Card>
      <Card  >
        <CardHeader className="flex flex-col items-center justify-center p-6" >
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              Consumo mensual por sector
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 pb-6">
          <div className="w-full h-full" >

            {consumedBySector.success && <LecturePieChart sectors={consumedBySector.data}></LecturePieChart>}

          </div>

        </CardBody>
      </Card>

    </div>
  );
}           