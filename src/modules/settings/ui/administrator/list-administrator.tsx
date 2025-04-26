import CustomTable from "@/components/table/CustomTable"
import { columns } from "./columns"
import { createApiSettingRepository } from "../../service/service-setting";
import FormModal from "@/components/modal/FormModal";
import FormAdministrator from "./form-administrator";

export  const  ListAdministrator = async ({ page, per_page, date, query, status }: { page: string, per_page: string, date: string, query: string, status: string }) => {

    const repository = createApiSettingRepository();
    const administrator = await repository.getAdministrator(date, query, status, parseInt(page), parseInt(per_page));
    //console.log(administrator)
    // console.log(countAdministrator)
    return (
        <div className="p-1">
            <FormModal>
                <FormAdministrator
                >
                </FormAdministrator>
            </FormModal>

            {administrator.success &&
                <CustomTable
                    columns={columns}
                    data={administrator.data}
                    per_page={10 }
                >
                </CustomTable>
            }


        </div>
    )
}



