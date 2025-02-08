import { getSectors } from "@/modules/incident/utils/use-media-query";
import { IServiceDashboardRepository } from "../utils/model";
import { getAmountIncident, getAmountInvoice, getAmountSheets, getRate, getTotalIncident, getTotalInvoice, getTotalSheets, getTotalUser, getTotalWaterMeter } from "../utils/use-media-query";


export function createApiDashboardRepository(): IServiceDashboardRepository {
    return {
      getAmountIncident,
      getTotalInvoice,
      getTotalSheets,
      getTotalWaterMeter,   
      getAmountInvoice,
      getAmountSheets,
      getTotalIncident,
      getRate,
      getTotalUser,
      getSectors


    };
}
