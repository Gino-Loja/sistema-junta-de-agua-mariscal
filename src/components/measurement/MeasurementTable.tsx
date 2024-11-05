import CustomTable from "../table/CustomTable";
import FiltersSearchLectures from "./MeasurementFiltersSearch";
import { columns } from './ColumnsMeasurement';
import TooltipUser from "./TooltipUser";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { Lectures } from "@/model/types";
//import { CustomActions } from "./Actions";

//const FiltersSearchLectures = dynamic(() => import('./FiltersSearchLectures'))
export default async function MeasurementTable({ repository, page, per_page, date , query}: { repository: ILecturesRepository, page: string, per_page: string, date: string, query:string }) {
  const lectures = per_page == '0'
    ? await repository.getLecturesByYearsAndMonths(date)
    : await repository.getLecturesPagination(date, Number(page), Number(per_page), query);
  //console.log(lectures)
  
  return (
    <div>
      {lectures.success &&
        <CustomTable<Lectures>
          columns={columns}
          data={lectures.data}
          per_page={Number(per_page)}
          //childrenFilterForCalendarTable={<FiltersSearchLectures />}
        >
          <TooltipUser />
        </CustomTable>
      }

    </div>




  )
}