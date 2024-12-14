import { IMeetingRepository } from "../utils/model";
import { getMeeting, insertMeeting, updateMeeting, deleteMeeting, getTotalMeetingByStatus, getCounterMeetingByDate, getTotalAmount } from "../utils/use-media-query";


export function createApiMeetingRepository(): IMeetingRepository {
    return {
      getMeeting,
      insertMeeting,
      updateMeeting,
      deleteMeeting,
      getTotalMeetingByStatus,
      getCounterMeetingByDate,
      getTotalAmount

    };
}
