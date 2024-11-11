import { useFilterPaginationParams } from "@/components/hooks/useFilterPaginationParams";
import SelectWaterMeter from "@/components/water-meter/id/SelectMedidor";
import WaterMeterDisplay from "@/components/water-meter/id/WaterMeterDisplay";
import { getWaterMeterById, getWaterMeterConsumptionById, getWaterMeterExcessById } from "@/lib/waterMeterAction";
import { CustomSearchParams, QueryResultError, WaterMeter } from "@/model/types";
import { Card, Chip } from "@nextui-org/react";

export default async function Page({ params, searchParams }: {
  params: { id: string },
  searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {

  const { medidor } = useFilterPaginationParams(searchParams);

  const data = await getWaterMeterById(Number(params.id));

  if (!data.success) return <div>Error al obtener el medidor</div>

  const matchedMedidor = data.data.find((item) => item.id === Number(medidor));



  // const estado:string = data.success ?  data


  return (
    <div className="p-3">

      {/* {data.success && (
        <SelectWaterMeter waterMeter={data.data}></SelectWaterMeter>
      )} */}
      <RenderSelectWaterMeter data={data.data} />

      <div className="columns-3xs gap-5 space-y-5">


        <div className="border border-default-200 rounded-xl">
          <RenderWaterMeterDetails id={params.id} />
        </div>

        <div className="border border-default-200 rounded-xl">
          <RenderWaterMeterDetailsExcess id={params.id} />
        </div>

        <div className="border border-default-200 rounded-xl">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">Estado del Medidor</h1>
            <div>
              <div className="space-y-4">
                <Chip className="text-4xl lg:text-4xl font-bold p-8" variant="flat" radius="lg" color={matchedMedidor?.estado === "Activo" ? "success" : "danger"}>{matchedMedidor?.estado}</Chip>
                <p className="text-muted-foreground">Actualizado</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="border border-default-200 rounded-xl">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">Asignado</h1>
            <div>
              <div className="space-y-4">
                <Chip className="text-4xl lg:text-2xl font-bold p-6" color="primary" variant="dot" radius="sm" >{matchedMedidor?.nombre}</Chip>
                <p className="text-muted-foreground">Actualizado</p>
              </div>
              {/* Add more meter details here when API is integrated */}
            </div>
          </Card>
        </div>

        <div className="border border-default-200 rounded-xl">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tipo del Medidor</h1>
            <div>
              <div className="space-y-4">
                <Chip className="text-4xl lg:text-2xl font-bold p-6" color="warning" variant="solid" radius="sm" >{matchedMedidor?.tipo}</Chip>
                <p className="text-muted-foreground">Actualizado</p>
              </div>
              {/* Add more meter details here when API is integrated */}
            </div>
          </Card>
        </div>


      </div>
    </div>
  );
}


async function RenderSelectWaterMeter({ data }: { data: WaterMeter[] }) {
  //const waterMeterByType = await repository.getWaterMeterbyType();
  return (
    <div>
      <SelectWaterMeter waterMeter={data} />

    </div>

  )
}

async function RenderWaterMeterDetails({ id }: { id: string }) {
  const data = await getWaterMeterConsumptionById(Number(id));
  return (
    <div>
      {data.success && <WaterMeterDisplay data={{ value: data.data.consumo_total }} title="Consumo" subtitle="cantidad de metros consumidos" size="h-52" />
      }
    </div>

  )
}

async function RenderWaterMeterDetailsExcess({ id }: { id: string }) {
  const data = await getWaterMeterExcessById(Number(id));
  return (
    <div>
      {data.success && <WaterMeterDisplay data={{ value: data.data.total_excesos }} title="Exceso" subtitle="cantidad de metros de exceso" size="h-44" />}
    </div>

  )
}
