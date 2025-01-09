import CustomTable from "@/components/table/CustomTable";
import { columns } from "./column-incident";
import { createApiIncidentRepository } from "../../service/service-incident";
import AddIncident from "./add-incident";


export default async function TableInvoice({ page, per_page, date, query , sector}: { page: string, per_page: string, date: string, query: string, sector:string }) {
    const repository = createApiIncidentRepository();
    const incidents =  await repository.getIncidents(date, query, Number(page), Number(per_page), sector);
 
    return (
        <div className="p-1">
            {incidents.success &&
                <CustomTable
                    columns={columns}
                    data={incidents.data}
                    per_page={Number(per_page)}
                >
                    <AddIncident></AddIncident> 
                </CustomTable>
            }
        </div>
    )
}