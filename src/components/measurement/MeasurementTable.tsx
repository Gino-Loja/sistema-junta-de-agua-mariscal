import CustomTable from "../table/CustomTable";
import { columns } from './ColumnsMeasurement';
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { Lectures } from "@/model/types";
//import { CustomActions } from "./Actions";

export default async function MeasurementTable({ repository, date, page, per_page, query, year, month, sector }: {
  repository: ILecturesRepository,
  page: string, per_page: string, date: string,
  query: string, year: number, month: number, sector: string

}) {
  
  const lectures = await repository.getLecturesPagination(Number(page), Number(per_page), query, year, month, sector);


  return (
    <div>
      {lectures.success &&


        <CustomTable<Lectures>
          columns={columns}
          data={lectures.data}
          per_page={Number(per_page)}
        //childrenFilterForCalendarTable={<FiltersSearchLectures />}
        >
        </CustomTable>

      }

    </div>




  )
}