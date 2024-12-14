
import { useFilterPaginationParams } from "@/components/hooks/useFilterPaginationParams";
import SelectWaterMeter from "@/components/water-meter/id/SelectMedidor";
import WaterMeterDisplay from "@/components/water-meter/id/WaterMeterDisplay";
import { getCounterMeterWaterbyId, getWaterMeterById, getWaterMeterConsumptionById, getWaterMeterExcessById } from "@/lib/waterMeterAction";
import { CustomSearchParams, WaterMeter } from "@/model/types";
import { Card, Chip, Divider } from "@nextui-org/react";
import WaterMeterTableById from "./table";
import { Suspense } from "react";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import PaginationControls from "@/components/table/PaginationControlsx";
import { ChevronLeft, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function Page({ params, searchParams }: {
  params: { id: string },
  searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {

  const { medidor, page, per_page, date, start, end } = await useFilterPaginationParams(searchParams);
  const data = await getWaterMeterById(Number(params.id));
  const counterRow = await getCounterMeterWaterbyId(Number(params.id), Number(medidor), date);


  if (!data.success) return <div>Error al obtener el medidor</div>
  if (!counterRow.success) return <div>Error la cantidad de lecturas del medidor</div>


  const matchedMedidor = data.data.find((item) => item.id === Number(medidor));
  const nada = 457.5

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
                <div className="border rounded-lg p-6">
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
                </div>
                {/* Stock section */}
                <div className="border rounded-lg p-6 overflow-hidden">
                  <h2 className="text-lg font-semibold mb-1">Lecturas registradas</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Lista de las lecturas registradas en el medidor seleccionado
                  </p>
                  <div className="overflow-hidden">
                    <Suspense key={page + per_page + medidor + date} fallback={<>cargando ...</>}>
                      <WaterMeterTableById page={page} per_page={per_page} date={date} id_medidor={medidor} id_usuario={params.id} />
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
                <div className="border rounded-lg p-6">
                  <h1 className="text-2xl font-bold mb-4">Asignado</h1>
                  {/* <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <select id="category" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select category</option>
                      <option value="clothing">Clothing</option>
                      <option value="electronics">Electronics</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="grid gap-3">
                    <label htmlFor="subcategory" className="text-sm font-medium">
                      Subcategory (optional)
                    </label>
                    <select id="subcategory" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select subcategory</option>
                      <option value="t-shirts">T-Shirts</option>
                      <option value="hoodies">Hoodies</option>
                      <option value="sweatshirts">Sweatshirts</option>
                    </select>
                  </div>
                </div> */}

                  <div>
                    <div className="space-y-3">
                      <Chip className="text-xl lg:text-xl font-bold p-5 text-wrap" color="primary" variant="dot" radius="md" >{matchedMedidor?.nombre}</Chip>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {/* Product Status section */}
                <div className="border rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Estado del medidor</h2>
                  <div className="grid gap-3">
                    <div >
                      <div>
                        <div className="space-y-3">
                          <Chip className="text-2xl lg:text-2xl font-bold p-6" variant="flat" radius="lg" color={matchedMedidor?.estado === "Activo" ? "success" : "danger"}>{matchedMedidor?.estado}</Chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product Images section */}
                <div className="border rounded-lg p-6 overflow-hidden">
                  <h2 className="text-lg font-semibold mb-1">Detalles</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Detalles del medidor
                  </p>
                  <div className="grid gap-2">

                    <div>
                      <div className="space-y-3 flex flex-col">
                        <div>
                          <span>Serie: </span> <Chip className="text-2xl lg:text-2xl font-bold p-5" color="default" variant="flat" radius="sm" >{matchedMedidor?.numero_serie}</Chip>

                        </div>

                        <div>
                          <span>Fecha: </span><Chip className="text-2xl lg:text-2xl font-bold p-5" color="success" variant="flat" radius="sm" >{matchedMedidor?.fecha_instalacion.toLocaleDateString()}</Chip>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                {/* Archive Product section */}
                <div className="border rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-1">Tipo del Medidor</h2>

                  <div >
                    <div className="space-y-3">
                      <Chip className="text-xl lg:text-xl font-bold p-6" color="warning" variant="solid" radius="sm" >{matchedMedidor?.tipo}</Chip>
                    </div>
                  </div>
                </div>
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

      <div className='hidden sm:block'>
        <FiltersSearchSheets />
      </div>
    </div>

  )
}

async function RenderWaterMeterDetails({ id }: { id: string }) {
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

async function RenderWaterMeterDetailsExcess({ id }: { id: string }) {
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
