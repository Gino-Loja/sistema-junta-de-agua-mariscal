import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";
import CustomTable from "../table/CustomTable";
import dynamic from "next/dynamic";
import { columns } from "./waterMeterColumns";
const TooltipWaterMeter = dynamic(() =>
  import("../forms/Tool").then((mod) => mod.default)
)




export default async function waterMeterTable({ repository, page, per_page, date, query, type, status }: { repository: IWaterMeter, page: string, per_page: string, date: string, query: string, type: string, status: string }) {
  const data = per_page == '0'
    ? await repository.getWaterMeter()
    : await repository.getWaterMeterPagination(Number(page), Number(per_page), query, type, status);

  
  return (

    <div>
      {data.success &&
        <CustomTable
          columns={columns}
          data={data.data}
          per_page={Number(per_page)}
        >
          <TooltipWaterMeter></TooltipWaterMeter>
        </CustomTable>
      }
    </div>
  )
}