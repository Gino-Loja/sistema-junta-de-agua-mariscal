import { FormDelete } from "@/components/forms/form-delete";
import { FormWaterMeter } from "@/components/forms/FormWaterMeter";
import Search from "@/components/forms/Search";
import { useFilterPaginationParams } from "@/components/hooks/useFilterPaginationParams";
import FormModalDelete from "@/components/modal/form-modal-delete";
import FormModal from "@/components/modal/FormModal";
import SkeletonCustom from "@/components/skeletons/skeleton";
import PaginationControls from "@/components/table/PaginationControlsx";
import WaterMeterTable from "@/components/water-meter/waterMeterTable";
import { CustomSearchParams } from "@/model/types";
import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";
import { createApiWaterMeter } from "@/services/waterMeterService";
import { Divider } from "@nextui-org/react";
import { Suspense } from "react";


//type ExtendedSearchParams = CustomSearchParams & { type: string };

export default async function Page({ searchParams }: {
  searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {

  const repositoryWaterMeter: IWaterMeter = createApiWaterMeter();

  const { date, page, per_page, query, start, end, type, status } = useFilterPaginationParams(searchParams);
  const data = await repositoryWaterMeter.getCounterMeterWater(query, status, type);
  return <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

    <FormModal>
      <FormWaterMeter />
    </FormModal>

    <FormModalDelete>
      <FormDelete funtionDelete={repositoryWaterMeter.deleteWaterMeter}></FormDelete>
    </FormModalDelete>

    <div className='flex flex-row gap-2 justify-between'>
      <div>
        <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Medidores</h1>
        <div className='sm:w-80 w-full'>
          <Search placeholder='Buscar por nombre...' />
        </div>
      </div>
    </div>
    <Divider />
    <Suspense key={page + query + per_page} fallback={<SkeletonCustom />}>
      <WaterMeterTable repository={repositoryWaterMeter}
        page={page}
        per_page={per_page}
        date={date}
        query={query}
        type={type}
        status={status} />
    </Suspense>

    {data.success &&
      <PaginationControls
        total={data.data.total_water_meters}
        hasNextPage={end < data.data.total_water_meters}
        hasPrevPage={start > 0} />}
  </div>;
}   