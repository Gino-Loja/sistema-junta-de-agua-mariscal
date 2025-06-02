"use server";
import Search from "@/components/forms/Search";
import FormModal from "@/components/modal/FormModal";
import PaginationControls from "@/components/table/PaginationControlsx";
import { createClient } from "@/lib/supabase/server";
import { coordinatesCache } from "@/modules/searchParams";
import { createApiSettingRepository } from "@/modules/settings/service/service-setting";
import { FormUpdateSectors } from "@/modules/settings/ui/sectors/form-update-sectors";
import { ListSectorsAdmin } from "@/modules/settings/ui/sectors/list-sectors";
import { PageProps } from "@/modules/types";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: PageProps) {
    const supabase = await createClient()
    const { error } = await supabase.auth.getUser()

    if (error) {
        redirect("/login")
    }

    const { query, per_page, page } = coordinatesCache.parse(searchParams)

    return (

        <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>

            <div className='flex flex-row gap-2 justify-between'>
                <div>
                    <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Sectores registrados</h1>
                </div>
            </div>
            <div className='sm:w-80 w-full'>
                
               

                <Search placeholder='Buscar por nombre...' />
            </div>

            <div className="flex flex-col gap-2">
                <ListSectorsAdmin query={query} />

                <FechtRenderPaginationControls
                    search={query}
                    page={page}
                    per_page={per_page}
                />

            </div>


        </div>

    )

}

async function FechtRenderPaginationControls({ search, page, per_page }: { search: string, page: string, per_page: string }) {
    const repository = createApiSettingRepository();
    const countAdministrator = await repository.countSectors({ search });

    const start = (Number(page) - 1) * Number(per_page)
    const end = start + Number(per_page)
    return (
        countAdministrator.success &&
        <PaginationControls
            total={countAdministrator.data}
            hasNextPage={end < countAdministrator.data}
            hasPrevPage={start > 0} />
    )
}