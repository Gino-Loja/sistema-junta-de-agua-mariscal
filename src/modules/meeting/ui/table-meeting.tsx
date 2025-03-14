import CustomTable from "@/components/table/CustomTable";
import { columns } from "./column-meeting";
import { createApiMeetingRepository } from "../service/service-meeting";
import AddMeeting from "./add-meeting";


export default async function TableMeeting({ page, per_page, date, query, year, status }: { page: string, per_page: string, date: string, query: string, year: number, status: string }) {
    const repository = createApiMeetingRepository();
    const meeting = await repository.getMeeting(date, query, Number(page), Number(per_page), year, status);
    return (
        <div className="p-1">
            {meeting.success &&
                <CustomTable
                    columns={columns}
                    data={meeting.data}
                    per_page={Number(per_page)}
                >
                    <AddMeeting></AddMeeting>
                </CustomTable>
            }
        </div>
    )
}