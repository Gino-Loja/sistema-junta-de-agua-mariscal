import CustomTable from "@/components/table/CustomTable";
import { columns } from "../column-invoice";
import { createApiServiceInvoiceRepository } from "../../service/service-invoice";


export default async function TableInvoice({ page, per_page, date, query, month, year }: { page: string, per_page: string, date: string, query: string, month: number, year: number }) {
    const repository = createApiServiceInvoiceRepository();
    const invoice =  await repository.getInvoice(Number(page), Number(per_page), date, query, month, year);

    return (
        <div className="p-1">
            {invoice.success &&
                <CustomTable
                    columns={columns}
                    data={invoice.data}
                    per_page={Number(per_page)}
                >
                </CustomTable>
            }
        </div>
    )
}