import { QueryResultError, WaterMeter, WaterMeterDto } from "../types";

export interface IWaterMeter {
    getWaterMeterPagination: (currentPage: number, itemsPerPage: number, query: string, type: string, status: string, date:string) => Promise<QueryResultError<WaterMeter[]>>;
    getWaterMeter: ()=> Promise<QueryResultError<WaterMeter[]>>
    getCounterMeterWater: (query: string, status: string, type:string, date:string)=> Promise<QueryResultError<{ total_water_meters: number }>>
    getUserByName: (name: string) => Promise<QueryResultError<{ id: number, nombre: string, cedula: string }[]>>
    createWaterMeter: (waterMeter: WaterMeterDto) => Promise<QueryResultError<boolean>>
    getWaterMeterbyType: () => Promise<QueryResultError<{ tipo: string, cantidad: number }[]>>
    getWaterMeterbyStatus: () => Promise<QueryResultError<{ name: string, value: number }[]>>
    getWaterMeterbySector: () => Promise<QueryResultError<{ name: string, value: number }[]>>
    updateWaterMeter: (waterMeter: WaterMeterDto, id: number) => Promise<QueryResultError<boolean>>

    deleteWaterMeter: (id: number) => Promise<QueryResultError<boolean>>
}

