import SelectStatus from "@/components/filters-table/selectStatus";
import TypeSelector from "@/components/filters-table/TypeSelector";
import Search from "@/components/forms/Search";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import SkeletonCustom from "@/components/skeletons/skeleton";
import PaginationControls from "@/components/table/PaginationControlsx";
import WaterMeterTable from "@/components/water-meter/waterMeterTable";
import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";
import { coordinatesCache } from "@/modules/searchParams";
import { PageProps } from "@/modules/types";
import { createApiWaterMeter } from "@/services/waterMeterService";
import { Divider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const FormModal = dynamic(() =>
  import('@/components/modal/FormModal').then((mod) => mod.default)
)
const FormWaterMeter = dynamic(() =>
  import('@/components/forms/FormWaterMeter').then((mod) => mod.FormWaterMeter)
)
const FormModalDelete = dynamic(() =>
  import('@/components/modal/form-modal-delete').then((mod) => mod.default)
)
const FormDelete = dynamic(() =>
  import('@/components/forms/form-delete').then((mod) => mod.FormDelete)
)



//type ExtendedSearchParams = CustomSearchParams & { type: string };

export default async function Page({ searchParams }: PageProps) {
  const { query, page, per_page, status, type, date } = coordinatesCache.parse(searchParams)
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page)
  const repositoryWaterMeter: IWaterMeter = createApiWaterMeter();


  const data = await repositoryWaterMeter.getCounterMeterWater(query, status, type, date);

  return <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

    <FormModal>
      <FormWaterMeter />
    </FormModal>

    <FormModalDelete>
      <FormDelete funtionDelete={repositoryWaterMeter.deleteWaterMeter}></FormDelete>
    </FormModalDelete>

    <div className='flex flex-row gap-2 justify-between'>
      <div className="w-full">
        <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Medidores</h1>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 ">
          <div className="w-full sm:col-span-2">
            <Search placeholder='Buscar por nombre...' />
          </div>
          <div className="w-full sm:col-start-3">
            <SelectStatus options={[{
              label: 'Activo',
              value: 'Activo'
            }, {
              label: 'Inactivo',
              value: 'Inactivo'
            }]} />
          </div>
          <div className="w-full sm:col-start-4">
            <TypeSelector options={[{
              label: 'Industrial',
              value: 'Industrial'
            }, {
              label: 'Domestico',
              value: 'Domestico'
            }, {
              label: 'Otro',
              value: 'Otro'
            }]} />
          </div>
          <div className="w-full sm:col-start-5">
            <FiltersSearchSheets />
          </div>
        </div>



      </div>
    </div>
    <Divider />
    <Suspense key={page + query + per_page} fallback={<SkeletonCustom />}>
      <WaterMeterTable
        repository={repositoryWaterMeter}
        page={page}
        per_page={per_page}
        date={date}
        query={query}
        type={type}
        status={status}
      />
    </Suspense>

    {data.success &&
      <PaginationControls
        total={data.data.total_water_meters}
        hasNextPage={end < data.data.total_water_meters}
        hasPrevPage={start > 0} />}
  </div>;
}   