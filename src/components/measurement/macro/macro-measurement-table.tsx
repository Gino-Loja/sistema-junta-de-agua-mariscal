
import CustomTable from "@/components/table/CustomTable";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { MeasurementMacro } from "@/model/types";
import { columns } from "./macro-measurement-column";
import AddMacro from "./add-macro";
//import { CustomActions } from "./Actions";

export default async function MeasurementMacroTable({ repository, page, per_page, date, from, to, month, year }: { repository: ILecturesRepository, page: string, per_page: string, date: string, from: string, to: string, month: number, year: number }) {
  const lectures =  await repository.getMeasurementMacro(Number(page), Number(per_page),from, to, Number(month), Number(year));
  //console.log(lectures)  
  return (
    <div>
      {lectures.success &&
        <CustomTable<MeasurementMacro>
          columns={columns}
          data={lectures.data}
          per_page={Number(per_page)}
          //childrenFilterForCalendarTable={<FiltersSearchLectures />}
        >
          <AddMacro></AddMacro>

        </CustomTable>
      }

    </div>




  )
}