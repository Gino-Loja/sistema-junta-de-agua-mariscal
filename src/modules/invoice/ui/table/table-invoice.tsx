import CustomTable from "@/components/table/CustomTable";
import { columns } from "../column-invoice";
import AddMeeting from "./add-invoice";
import { createApiServiceInvoiceRepository } from "../../service/service-invoice";


export default async function TableInvoice({ page, per_page, date, query }: { page: string, per_page: string, date: string, query: string }) {
    const repository = createApiServiceInvoiceRepository();
    const invoice =  await repository.getInvoice(Number(page), Number(per_page), date, query);

    return (
        <div className="p-1">
            {invoice.success &&
                <CustomTable
                    columns={columns}
                    data={invoice.data}
                    per_page={Number(per_page)}
                >
                    <AddMeeting></AddMeeting>
                </CustomTable>
            }
        </div>
    )
}