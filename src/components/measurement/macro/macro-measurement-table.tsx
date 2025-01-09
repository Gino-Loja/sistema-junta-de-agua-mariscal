
import CustomTable from "@/components/table/CustomTable";
import { ILecturesRepository } from "@/model/lecturas-repository/lecturasRepository";
import { MeasurementMacro } from "@/model/types";
import { columns } from "./macro-measurement-column";
import AddMacro from "./add-macro";
//import { CustomActions } from "./Actions";

export default async function MeasurementMacroTable({ repository, page, per_page, date }: { repository: ILecturesRepository, page: string, per_page: string, date: string }) {
  const lectures =  await repository.getMeasurementMacro(date, Number(page), Number(per_page));
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