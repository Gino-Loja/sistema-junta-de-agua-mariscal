
import SelectWaterMeter from "@/components/water-meter/id/SelectMedidor";
import WaterMeterDisplay from "@/components/water-meter/id/WaterMeterDisplay";
import { getCounterMeterWaterbyId, getWaterMeterById, getWaterMeterConsumptionById, getWaterMeterExcessById } from "@/lib/waterMeterAction";
import { CustomSearchParams, WaterMeter } from "@/model/types";
import { Chip } from "@nextui-org/react";
import WaterMeterTableById from "./table";
import { Suspense } from "react";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import PaginationControls from "@/components/table/PaginationControlsx";
import { Activity, Calendar, ChevronLeft, Droplet, Gauge, Hash } from 'lucide-react'
import Link from 'next/link'
import { coordinatesCache } from "@/modules/searchParams";
import YearSelector from "@/components/filters-table/YearSelector";

export default async function Page({ params, searchParams }: {
  params: { id: string },
  searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {

  const { year, page, query, status, per_page, wm } = coordinatesCache.parse(searchParams);
  
  const data = await getWaterMeterById(Number(params.id));

  const counterRow = await getCounterMeterWaterbyId(Number(params.id), Number(wm), 2025);


  if (!data.success) return <div>Error al obtener el medidor</div>
  if (!counterRow.success) return <div>Error la cantidad de lecturas del medidor</div>

  const matchedMedidor = data.data.find((item) => item.id === Number(wm));
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">

      <div className="flex flex-col sm:gap-4 pb-4">
        <div className="flex items-center gap-4 px-4">
          <Link href={'table'}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Regresar</span>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Regresar
          </h1>

          <RenderSelectWaterMeter data={data.data} />


         
        </div>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className=" grid flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                {/* <div className="border rounded-lg p-6">


                  <h2 className="text-lg font-semibold mb-1">Detalles del consumo</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Consumo y exceso del medidor seleccionado
                  </p>
                  <div className="grid lg:grid-cols-2 gap-6">

                    <div className="border  rounded-xl">
                      <RenderWaterMeterDetails id={medidor} />
                    </div>


                    <div className="border  rounded-xl">
                      <RenderWaterMeterDetailsExcess id={medidor} />
                    </div>

                  </div>
                </div> */}

                <section className=" border shadow rounded-md hover:shadow-hover transition-shadow p-6">
                  <h2 className="text-xl font-semibold mb-2">Detalles del consumo</h2>
                  <p className="text-gray-500 mb-6">Consumo y exceso del medidor seleccionado</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br  rounded-xl p-6">
                      <RenderWaterMeterDetails id={wm!} />
                    </div>
                    <div className="bg-gradient-to-br  rounded-xl p-6">
                      <RenderWaterMeterDetailsExcess id={wm!} />
                    </div>
                  </div>
                </section>




                {/* Stock section */}



                <div className="border rounded-md shadow p-6 overflow-hidden">
                  <h2 className="text-lg font-semibold mb-1">Lecturas registradas</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Lista de las lecturas registradas en el medidor seleccionado
                  </p>
                  <div className="overflow-hidden">
                    <Suspense key={page + per_page + wm + year} fallback={<>cargando ...</>}>
                      <WaterMeterTableById page={page} per_page={per_page} date={year} id_medidor={wm!} id_usuario={params.id} />
                    </Suspense>
                    <Suspense fallback={<div>cargando</div>}>
                      <div className="mt-3">
                        <PaginationControls
                          total={counterRow.data.total_lecturas}
                          hasNextPage={end < counterRow.data.total_lecturas}
                          hasPrevPage={start > 0} />
                      </div>

                    </Suspense>
                  </div>
                </div>
                {/* Product Category section */}

              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {/* Product Status section */}

                <section className="border rounded-md shadow p-6">
                  <h2 className="text-xl font-semibold mb-6">Asignado</h2>
                  <Chip
                    className="text-lg font-semibold p-6 w-full justify-center"
                    color="primary"
                    variant="dot"
                    radius="lg"
                  >
                    {matchedMedidor?.nombre}
                  </Chip>
                </section>
                <section className="border rounded-md shadow  p-6">

                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">

                    Estado del medidor</h2>
                  <Chip
                    className="text-lg font-medium py-6 px-8 w-full gap-3"
                    variant="flat"
                    radius="md"
                    color={matchedMedidor?.estado === "Activo" ? "success" : "danger"}
                  >
                    <div className="flex justify-center items-center gap-3">
                      <Activity className="h-5 w-5" />

                      {matchedMedidor?.estado}
                    </div>

                  </Chip>
                </section>
                {/* Product Images section */}
                <section className="border rounded-md shadow  transition-shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Detalles</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Hash className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Serie</p>
                        <p className="font-medium">{matchedMedidor?.numero_serie}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Fecha de instalación</p>
                        <p className="font-medium">{matchedMedidor?.fecha_instalacion}</p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Archive Product section */}
                <section className="border rounded-md shadow  p-8 ">
                  <h2 className="text-xl font-bold mb-6  flex items-center gap-2">
                    <Gauge className="h-6 w-6" />
                    Tipo del Medidor
                  </h2>
                  <Chip
                    className="text-lg font-semibold py-6 px-8 w-full justify-center   border-2 "
                    radius="lg"
                  >
                    {matchedMedidor?.tipo}
                  </Chip>
                </section>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>

  );
}


async function RenderSelectWaterMeter({ data }: { data: WaterMeter[] }) {

  //const waterMeterByType = await repository.getWaterMeterbyType();
  return (
    <div className="flex w-96	items-center gap-2 md:ml-auto">
      <div className="w-2/3" >
        <SelectWaterMeter waterMeter={data} />
      </div>

      <div className='w-2/3'>
        <YearSelector />
      </div>
    </div>

  )
}

async function RenderWaterMeterDetails({ id }: { id: number }) {
  const data = await getWaterMeterConsumptionById(Number(id));
  return (
    <div>
      {data.success && <WaterMeterDisplay
        data={{ value: data.data.consumo_total }}
        title="Consumo"
        subtitle="cantidad total de metros consumidos" size="h-42" />}
    </div>

  )
}

async function RenderWaterMeterDetailsExcess({ id }: { id: number }) {
  const data = await getWaterMeterExcessById(Number(id));
  //console.log(id)
  return (
    <div>
      {data.success && <WaterMeterDisplay

        data={{ value: data.data.total_excesos }}
        title="Exceso"
        subtitle="cantidad total de metros de exceso" size="h-42" />}
    </div>

  )
}
