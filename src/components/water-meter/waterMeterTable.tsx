import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";
import CustomTable from "../table/CustomTable";
import dynamic from "next/dynamic";
import { columns } from "./waterMeterColumns";
const TooltipWaterMeter = dynamic(() =>
  import("../forms/Tool").then((mod) => mod.default)
)




export default async function waterMeterTable({ repository, page, per_page, date, query, type, status }: { repository: IWaterMeter, page: string, per_page: string, date: string, query: string, type: string, status: string }) {
  const sheets = per_page == '0'
    ? await repository.getWaterMeter()
    : await repository.getWaterMeterPagination(Number(page), Number(per_page), query, type, status);

    console.log(status)
  
  return (

    <div>
      {sheets.success &&
        <CustomTable
          columns={columns}
          data={sheets.data}
          per_page={Number(per_page)}
        >
          <TooltipWaterMeter></TooltipWaterMeter>
        </CustomTable>
      }
    </div>
  )
}