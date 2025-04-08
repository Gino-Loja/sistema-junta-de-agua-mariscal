import { getCalculateMonthlyRevenue, getAmountMonthsByYear, getRevenueBySector, getSheetsByYearsAndMonths, percentageRevenueByStatus, getSheetsPagination, getCounterSheets, updateSheet, getSheetsByUser, getWaterMeterById, getCountSheetPendingByUser, getUserById, getCounterSheetsByUser } from "@/lib/sheetsAction";
import { ISheetsRepository } from "@/model/sheets-repository/sheetsRepository";

export function createApiSheetsRepository(): ISheetsRepository {
    return {
        getSheetsByYearsAndMonths,
        getCalculateMonthlyRevenue,
        getRevenueBySector,
        percentageRevenueByStatus,
        getAmountMonthsByYear,
        getSheetsPagination,
        getCounterSheets,
        updateSheet,
        getSheetsByUser,
        getWaterMeterById,
        getCountSheetPendingByUser,
        getUserById,
        getCounterSheetsByUser

    };
}
