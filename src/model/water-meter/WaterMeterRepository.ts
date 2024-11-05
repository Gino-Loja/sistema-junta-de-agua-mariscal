import { QueryResultError, WaterMeter, WaterMeterDto } from "../types";

export interface IWaterMeter {
    getWaterMeterPagination: (currentPage: number, itemsPerPage: number, query: string, type: string, status: string) => Promise<QueryResultError<WaterMeter[]>>;
    getWaterMeter: ()=> Promise<QueryResultError<WaterMeter[]>>
    getCounterMeterWater: (query: string, status: string, type:string)=> Promise<QueryResultError<{ total_water_meters: number }>>
    getUserByName: (name: string) => Promise<QueryResultError<{ id: number, nombre: string }[]>>
    createWaterMeter: (waterMeter: WaterMeterDto) => Promise<QueryResultError<boolean>>
}

