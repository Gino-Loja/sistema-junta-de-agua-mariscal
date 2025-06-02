import CustomTable from "@/components/table/CustomTable"
import { createApiSettingRepository } from "../../service/service-setting";
import { columns } from "./column";
import TooltipSectors from "./Tooltip-sector";

// import { FormUpdateSectors } from "./form-update-sectors";

export const ListSectorsAdmin = async ({ query }: { query: string }) => {

    const repository = createApiSettingRepository();

    const listSectors = await repository.getSectors({ search: query });
  
    

   
    return (
        <div className="p-1">
         
            {listSectors.success &&
                <CustomTable
                    columns={columns}
                    data={listSectors.data}
                    per_page={10}
                >
                    <TooltipSectors></TooltipSectors>
                </CustomTable>
            }


        </div>
    )
}



