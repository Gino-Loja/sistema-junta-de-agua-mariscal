'use server'
import { createApiServiceInvoiceRepository } from "@/modules/invoice/service/service-invoice";
import FormInvoice from "@/modules/invoice/ui/form-invoice";

export default async function Page() {
    const repository = createApiServiceInvoiceRepository();

    const informationCompany = await repository.getInformationCompany();
    const numberInvoice = await repository.getNumberInvoice();
    const paymentMethods = await repository.getPaymentMethods();


    if (!informationCompany.success) {
        return <div>Error al obtener la información de la empresa</div>;
    }

    if (!paymentMethods.success) {
        return <div>Error al obtener los metodos de pago</div>;
    }

    if (!numberInvoice.success) {
        return <div>Error al obtener el numero de factura</div>;
    }


    return (
        <div className="flex flex-col gap-4 px-4 pb-4">

            <FormInvoice 
            paymentMethods={paymentMethods.data}
             informationCompany={informationCompany.data[0]}
              repositoryService={repository}
              numberInvoice={numberInvoice.data}
              />
        </div>

    )
}