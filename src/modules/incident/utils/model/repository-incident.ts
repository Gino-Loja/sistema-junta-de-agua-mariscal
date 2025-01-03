import { QueryResultError } from "@/model/types";
import { CounterMeeting, InformationCompany, Meeting, PaymentMethod, Service, StatusAllMeeting } from "../../types";

export interface IServiceInvoiceRepository {
    getMeeting: (date: string, query: string, currentPage: number, itemsPerPage: number) => Promise<QueryResultError<Meeting[]>>;
    insertMeeting: (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; }) => Promise<QueryResultError<Meeting[]>>;
    updateMeeting: (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; multa_id: number; }) => Promise<QueryResultError<Meeting[]>>;
    deleteMeeting: (id: number) => Promise<QueryResultError<Meeting[]>>;
    getTotalMeetingByStatus: (date: string) => Promise<QueryResultError<StatusAllMeeting[]>>;
    getCounterMeetingByDate: (date: string, query: string) => Promise<QueryResultError<CounterMeeting>>;
    getTotalAmount: (date: string) => Promise<QueryResultError<number>>;
    getServive: () => Promise<QueryResultError<Service[]>>;
    getInformationCompany: () => Promise<QueryResultError<InformationCompany[]>>;
    getPaymentMethods: () => Promise<QueryResultError<PaymentMethod[]>>;
    getNumberInvoice: () => Promise<QueryResultError<number>>;
}

