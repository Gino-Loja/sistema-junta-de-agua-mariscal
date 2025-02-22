import { createWaterMeter, deleteWaterMeter, getCounterMeterWater, getUserByName, getWaterMeter, getWaterMeterbySector, getWaterMeterbyStatus, getWaterMeterbyType, getWaterMeterPagination, updateWaterMeter } from "@/lib/waterMeterAction";
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
        getWaterMeterbySector,
        updateWaterMeter,
        deleteWaterMeter

    };
}
