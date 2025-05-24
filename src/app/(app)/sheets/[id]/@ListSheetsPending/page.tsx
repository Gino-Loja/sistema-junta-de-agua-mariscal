import { ISheetsRepository } from "@/model/sheets-repository/sheetsRepository";
import { coordinatesCache } from "@/modules/searchParams";
import ListSheetsPending from "@/modules/sheet/ui/list-sheets-pending";
import { createApiSheetsRepository } from "@/services/serviceSheets";
import { Alert } from "@nextui-org/react";

export default async function Page({ params, searchParams }: {
    params: { id: string },
    searchParams: Record<string, string | string[] | undefined>
}) {

    const { date, page, status, per_page, yr, month, wm } = coordinatesCache.parse(searchParams);

    const repositorySheets: ISheetsRepository = createApiSheetsRepository();
    const user = await repositorySheets.getUserById(Number(params.id));

    const waterMeters = await repositorySheets.getWaterMeterById(Number(params.id));

    //   const countSheets = await repository.getCountSheetPendingByUser(yr, month, userId, medidorId);


    if (!user.success) return <div>Usuario no encontrado</div>

    if (!waterMeters.success) {
      return <div>Error al cargar el medidor</div>;
    }
    return (
        // <ListSheetsPending data={countSheets.data} />
        <div>Pendientes</div>
    )
}