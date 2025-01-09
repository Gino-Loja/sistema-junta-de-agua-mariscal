import { QueryResultError, Sector } from "@/model/types";

export interface IServiceIncidentRepository {

    
    getTotalIncidentByYear(date: string): Promise<QueryResultError<number>>;
    getTotalIncidentBySector(date: string): Promise<QueryResultError<{  name: string, value: number }[]>>;
    getTotalAmountCostIncidetByYear(date: string): Promise<QueryResultError<number>>;   
    getIncidents(date: string, query: string, currentPage: number, itemsPerPage: number, sectorId:string): Promise<QueryResultError<Incident[]>>;
    insertIncident(formData: { usuario_id: number; fecha: Date, sector_id: number; descripcion: string; foto: string; costo: number; }): Promise<QueryResultError<Incident[]>>;
    updateIncident(formData: { usuario_id: number; fecha: Date, sector_id: number; descripcion: string; foto: string; costo: number; incident_id: number }): Promise<QueryResultError<Incident[]>>;
    deleteIncident(id: number): Promise<QueryResultError<boolean>>;
    
    getSectors(): Promise<QueryResultError<{ value: string, label: string }[]>>;
}

