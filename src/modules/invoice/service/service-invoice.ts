import { IInvoiceRepository } from "../utils/model";
import {  getServive, getInformationCompany, getPaymentMethods, getNumberInvoice, getInvoice, getCounterInvoiceByDate } from "../utils/use-media-query";


export function createApiServiceInvoiceRepository(): IInvoiceRepository {
    return {
      
      getServive,
      getInformationCompany,
      getPaymentMethods,
      getNumberInvoice,
      getInvoice,
      getCounterInvoiceByDate

    };
}
