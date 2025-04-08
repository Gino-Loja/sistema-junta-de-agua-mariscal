
import CustomTable from "@/components/table/CustomTable";
import { ISheetsRepository } from "@/model/sheets-repository/sheetsRepository";
import { coordinatesCache } from "@/modules/searchParams";
import { createApiSheetsRepository } from "@/services/serviceSheets";
import { columns } from "./column";
import ListSheetsPending from "@/modules/sheet/ui/list-sheets-pending";
import { Alert } from "@nextui-org/react";
import MonthSelector from '@/components/filters-table/MonthSelector';
import YearSN from "@/components/filters-table/YearSN";
import SelectWaterMeterByUser from "@/modules/sheet/ui/select-water-meter-by-user";
import SelectStatus from "@/components/filters-table/selectStatus";
import FormModal from "@/components/modal/FormModal";
import FormAddSheet from "@/components/forms/FormSheet";
import PaginationControls from "@/components/table/PaginationControlsx";

export default async function Page({ params, searchParams }: {
  params: { id: string },
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { date, page, query, status, per_page, yr, month, wm } = coordinatesCache.parse(searchParams);


  const repositorySheets: ISheetsRepository = createApiSheetsRepository();
  const user = await repositorySheets.getUserById(Number(params.id));

  const waterMeters = await repositorySheets.getWaterMeterById(Number(params.id));

  if (!user.success) return <div>Usuario no encontrado</div>

  if (!waterMeters.success) {
    return <div>Error al cargar el medidor</div>;
  }

  return (
    <div className="p-4 w-full">
      <FormModal>
        <FormAddSheet></FormAddSheet>
      </FormModal>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mb-4">
        {/* Cuadro 1 (Información del usuario) */}
        <div className=" flex justify-between items-center sm:col-auto">
          <div>
            <h2 className="text-2xl font-semibold w-full ">{user.data.nombre}</h2>
            <p className="text-gray-700">
              Cédula: <span className="font-medium">{user.data.cedula}</span>
            </p>
          </div>
        </div>

        {/* Cuadro 2 (Selector de Medidor) */}
        <div className=" flex justify-between items-center col-span-full sm:col-auto lg:col-start-5">
          <SelectWaterMeterByUser waterMeter={waterMeters.data} />
        </div>

        {/* Cuadro 3 (Año) */}
        <div className=" w-full">
          <YearSN />
        </div>

        {/* Cuadro 4 (Mes) */}
        <div className=" w-full">
          <MonthSelector />
        </div>

        {/* Cuadros 5, 6, 7 */}
        <div className="w-full">
          <SelectStatus options={[
            { label: 'Pagado', value: 'pagada' },
            { label: 'Pendiente', value: 'pendiente' }
          ]} />
        </div>
        {/* <div className="  flex justify-between items-center">
          <div>Selector 6</div>
        </div>
        <div className=" flex justify-between items-center">
          <div>Selector 7</div>

        </div> */}
      </div>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-5 ">
        <div className="col-span-4 ">
          <TableSheetsUser
            repository={repositorySheets}
            page={page}
            per_page={per_page}
            date={date}
            year={yr}
            month={month}
            status={status}
            medidorId={wm ? Number(wm) : waterMeters.data[0].id}
            userId={Number(params.id)}
            query=""
          />
          <div className="flex justify-between items-center mt-4">
          <FechtRenderPaginationControls
            repository={repositorySheets}
            date={date}
            year={yr}
            month={month}
            status={status}
            usuarioId={Number(params.id)}
            medidorId={wm ? Number(wm) : waterMeters.data[0].id}
            page={Number(page)}
            per_page={Number(per_page)}
          />
          </div>

       


        </div>
        <div className="col-span-1 flex  justify-center border shadow-sm p-3 rounded-md">
          <FechtRenderListSheetsPending
            repository={repositorySheets}
            yr={yr} month={month}
            userId={Number(params.id)}
            medidorId={wm ? Number(wm) : waterMeters.data[0].id}
             />
        </div>

      </div>




    </div>
  );
}

export async function TableSheetsUser({ repository, page, per_page, date, year, month, status, medidorId, userId }:
  {
    repository: ISheetsRepository, page: string,
    per_page: string, date: string, query: string,
    year: number | null, month: number | null,
    status: string, medidorId: number,
    userId: number
  }) {
  const sheets = await repository.getSheetsByUser(
    date,
    Number(page),
    Number(per_page),
    year,
    month,
    status,
    userId,
    medidorId,
  );
  return (


    <div>
      {sheets.success &&
        <CustomTable
          columns={columns}
          data={sheets.data}
          per_page={Number(per_page)}
        >
          {/* <TooltipSheets></TooltipSheets> */}
        </CustomTable>
      }
    </div>
  )
}


async function FechtRenderListSheetsPending({ repository, yr, month, userId, medidorId }: { repository: ISheetsRepository, yr: number | null, month: number | null, userId: number, medidorId: number }) {
  const countSheets = await repository.getCountSheetPendingByUser(yr, month, userId, medidorId);

  if (!countSheets.success) {
    return <Alert color={'danger'} title={`!${countSheets.error}`} />
  }
  return (
    <ListSheetsPending data={countSheets.data} />
  )
}

async function FechtRenderPaginationControls({ repository, date, medidorId, month, page, per_page, status, usuarioId, year }: { repository: ISheetsRepository, date: string, year: number | null, month: number | null, status: string, usuarioId: number, medidorId: number, page: number, per_page: number }) {

  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page)

  const data = await repository.getCounterSheetsByUser(
    date,
    year,
    month,
    status,
    usuarioId,
    medidorId
  )
  return (
    data.success &&
    <PaginationControls
      total={data.data.total_planillas}
      hasNextPage={end < data.data.total_planillas}
      hasPrevPage={start > 0} />
  )
}
