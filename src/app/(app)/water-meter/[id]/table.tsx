import CustomTable from "@/components/table/CustomTable";
import { IDcolumns } from "@/components/water-meter/id/IDcolumns";
import { getWaterMeterLecturesById } from "@/lib/waterMeterAction"


export default async function WaterMeterTableById({  page, per_page, date, id_medidor, id_usuario }: {  page: string, per_page: string, date: number, id_medidor: number, id_usuario: string }) {

    const data = await getWaterMeterLecturesById( Number(id_usuario), Number(id_medidor), date, Number(page), Number(per_page));
    if (!data.success) return <div>{data.error}</div>

    return (
  
      <div>
        {data.success &&
          <CustomTable
            columns={IDcolumns}
            data={data.data}
            per_page={Number(per_page)}
          >
          </CustomTable>
        }
      </div>
    )
  }