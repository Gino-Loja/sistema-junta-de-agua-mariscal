
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
  // console.log(matchedMedidor)


  // const estado:string = data.success ?  data


  return (
    <div className="p-2 w-100">

      <RenderSelectWaterMeter data={data.data} />
      <Divider className="px-3" />

      <div className="p-3 w-100 grid sm:grid-cols-2 gap-4">
        <div className="columns-3xs gap-5 space-y-3">

          <div className="border  rounded-xl">
            <RenderWaterMeterDetails id={medidor} />
          </div>


          <div className="border  rounded-xl">
            <RenderWaterMeterDetailsExcess id={medidor} />
          </div>

          <div className="border  rounded-xl">
            <Card className="p-4">
              <h1 className="text-2xl font-bold mb-4">Estado del Medidor</h1>
              <div>
                <div className="space-y-3">
                  <Chip className="text-4xl lg:text-4xl font-bold p-8" variant="flat" radius="lg" color={matchedMedidor?.estado === "Activo" ? "success" : "danger"}>{matchedMedidor?.estado}</Chip>
                  <p className="text-muted-foreground">Actualizado</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="border rounded-xl">
            <Card className="p-4">
              <h1 className="text-2xl font-bold mb-4">Asignado</h1>
              <div>
                <div className="space-y-3">
                  <Chip className="text-4xl lg:text-2xl font-bold p-6 text-wrap" color="primary" variant="dot" radius="sm" >{matchedMedidor?.nombre}</Chip>
                  <p className="text-muted-foreground">Actualizado</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="border  rounded-xl">
            <Card className="p-4">
              <h1 className="text-2xl font-bold mb-4">Tipo del Medidor</h1>
              <div>
                <div className="space-y-3">
                  <Chip className="text-4xl lg:text-2xl font-bold p-6" color="warning" variant="solid" radius="sm" >{matchedMedidor?.tipo}</Chip>
                  <p className="text-muted-foreground">Actualizado</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="border rounded-xl">
            <Card className="p-4">
              <h1 className="text-2xl font-bold mb-4">Detalles</h1>
              <div>
                <div className="space-y-3 flex flex-col">
                  <div>
                    <span>Serie: </span> <Chip className="text-2xl lg:text-2xl font-bold p-5" color="default" variant="flat" radius="sm" >{matchedMedidor?.numero_serie}</Chip>

                  </div>

                  <div>
                    <span>Fecha: </span><Chip className="text-2xl lg:text-2xl font-bold p-5" color="success" variant="flat" radius="sm" >{matchedMedidor?.fecha_instalacion.toLocaleDateString()}</Chip>

                  </div>
                  <p className="text-muted-foreground">Actualizado</p>
                </div>
              </div>
            </Card>
          </div>


        </div>
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
    </div>
  );
}


async function RenderSelectWaterMeter({ data }: { data: WaterMeter[] }) {
  //const waterMeterByType = await repository.getWaterMeterbyType();
  return (
    <div className="flex flex-row mb-3 w-100 gap-3 px-3">
      <SelectWaterMeter waterMeter={data} />

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
      {data.success && <WaterMeterDisplay data={{ value: data.data.consumo_total }} title="Consumo" subtitle="cantidad de metros consumidos" size="h-52" />}
    </div>

  )
}

async function RenderWaterMeterDetailsExcess({ id }: { id: string }) {
  const data = await getWaterMeterExcessById(Number(id));
  //console.log(id)
  return (
    <div>
      {data.success && <WaterMeterDisplay data={{ value: data.data.total_excesos }} title="Exceso" subtitle="cantidad de metros de exceso" size="h-52" />}
    </div>

  )
}
