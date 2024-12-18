import { createWaterMeter, getCounterMeterWater, getUserByName, getWaterMeter, getWaterMeterbySector, getWaterMeterbyStatus, getWaterMeterbyType, getWaterMeterPagination } from "@/lib/waterMeterAction";
import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";

export function createApiWaterMeter(): IWaterMeter {
    return {
        getWaterMeterPagination,
        getWaterMeter,
        getCounterMeterWater,
        getUserByName,
        createWaterMeter,
        getWaterMeterbyType,
        getWaterMeterbyStatus,
        getWaterMeterbySector

    };
}
