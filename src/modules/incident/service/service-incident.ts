import { IServiceIncidentRepository } from "../utils/model";
import { deleteIncident, getIncidents, getSectors, getTotalAmountCostIncidetByYear, getTotalIncidentBySector, getTotalIncidentByYear, insertIncident, updateIncident } from "../utils/use-media-query";

export function createApiIncidentRepository(): IServiceIncidentRepository {
    return {
      deleteIncident,
      getTotalAmountCostIncidetByYear,
      getTotalIncidentBySector,
      getTotalIncidentByYear,
      getIncidents,
      insertIncident,      
      updateIncident,
      getSectors

    };
}
