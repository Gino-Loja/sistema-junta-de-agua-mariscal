import CustomTable from "@/components/table/CustomTable";
import { columns } from "./column-incident";
import { createApiIncidentRepository } from "../../service/service-incident";
import { IncidentParams } from "../../types";
import dynamic from "next/dynamic";

const AddIncident = dynamic(() => import('./add-incident').then((mod) => mod.default));

export default async function TableInvoice(props: IncidentParams) {
    const repository = createApiIncidentRepository();
    const { date, query, page, per_page, sector, year, month } = props;
    const incidents =  await repository.getIncidents(date, query, Number(page), Number(per_page), sector, year, month);

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