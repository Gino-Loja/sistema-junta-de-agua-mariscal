import CustomTable from "../table/CustomTable";
import { columns } from './ColumnsSheets';
import { ISheetsRepository } from '@/model/sheets-repository/sheetsRepository';
import dynamic from "next/dynamic";



export default async function TableSheets({ repository, page, per_page, date, query }: { repository: ISheetsRepository, page: string, per_page: string, date: string, query:string }) {
  const sheets = per_page == '0'
    ? await repository.getSheetsByYearsAndMonths(date)
    : await repository.getSheetsPagination(date, Number(page), Number(per_page), query);
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