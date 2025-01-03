import { IServiceInvoiceRepository } from "../utils/model";
import { getMeeting, insertMeeting, updateMeeting, deleteMeeting, getTotalMeetingByStatus, getCounterMeetingByDate, getTotalAmount, getServive, getInformationCompany, getPaymentMethods, getNumberInvoice } from "../utils/use-media-query";


export function createApiIncidentInvoiceRepository(): IServiceInvoiceRepository {
    return {
      getMeeting,
      insertMeeting,
      updateMeeting,
      deleteMeeting,
      getTotalMeetingByStatus,
      getCounterMeetingByDate,
      getTotalAmount,
      getServive,
      getInformationCompany,
      getPaymentMethods,
      getNumberInvoice


    };
}
