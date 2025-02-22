import { QueryResultError } from "@/model/types";
import { CounterMeeting, Meeting, StatusAllMeeting } from "../../types";

export interface IMeetingRepository {
    getMeeting: (date: string, query: string, currentPage: number, itemsPerPage: number) => Promise<QueryResultError<Meeting[]>>;
    insertMeeting: (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; }) => Promise<QueryResultError<Meeting[]>>;
    updateMeeting: (formData: { usuario_id: number; fecha: Date, estado: string; motivo: string; multa_id: number; }) => Promise<QueryResultError<boolean>>;
    deleteMeeting: (id: number) => Promise<QueryResultError<boolean>>;
    getTotalMeetingByStatus: (date: string) => Promise<QueryResultError<StatusAllMeeting[]>>;
    getCounterMeetingByDate: (date: string, query: string) => Promise<QueryResultError<CounterMeeting>>;
    getTotalAmount: (date: string) => Promise<QueryResultError<number>>;
}

