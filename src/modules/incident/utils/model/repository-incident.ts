import { QueryResultError } from "@/model/types";
import { Incident } from "../../types";

export interface IServiceIncidentRepository {

    
    getTotalIncidentByYear(year: number, month: number | null): Promise<QueryResultError<number>>;
    getTotalIncidentBySector(year: number, month: number | null): Promise<QueryResultError<{  name: string, value: number }[]>>;
    getTotalAmountCostIncidetByYear(year: number, month: number | null): Promise<QueryResultError<number>>;   
    getIncidents(date: string, query: string, currentPage: number, itemsPerPage: number, sectorId:string, year:number, month:number | null): Promise<QueryResultError<Incident[]>>;
    insertIncident(formData: { usuario_id: number, fecha: string, sector_id: number, descripcion: string, costo: number}): Promise<QueryResultError<boolean>>;
    updateIncident(formData: { usuario_id: number, fecha: string, sector_id: number, descripcion: string, costo: number,incident_id: number }): Promise<QueryResultError<boolean>>;
    deleteIncident(id: number): Promise<QueryResultError<boolean>>;
    
    getSectors(): Promise<QueryResultError<{ value: string, label: string }[]>>;
    getCounterIncidentPagination(date: string, query: string, sectorId: string, year: number, month: number | null): Promise<QueryResultError<number>>;
}

