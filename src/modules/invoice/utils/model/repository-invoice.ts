import { QueryResultError } from "@/model/types";
import {  InformationCompany, Invoice, PaymentMethod, Service } from "../../types";

export interface IInvoiceRepository {
 
    getServive: () => Promise<QueryResultError<Service[]>>;
    getInformationCompany: () => Promise<QueryResultError<InformationCompany[]>>;
    getPaymentMethods: () => Promise<QueryResultError<PaymentMethod[]>>;
    getNumberInvoice: () => Promise<QueryResultError<number>>;
    getInvoice: (page: number, per_page: number, date: string, query: string) => Promise<QueryResultError<Invoice[]>>;
    getCounterInvoiceByDate: (date: string, query: string) => Promise<QueryResultError<{ total: number }>>;
}

