import { createClient } from "@/lib/supabase/server";
import { coordinatesCache } from "@/modules/searchParams";
import { ListAdministrator } from "@/modules/settings/ui/administrator/list-administrator";
import { redirect } from "next/navigation";
import { PageProps } from "@/modules/types";
import SelectStatus from "@/components/filters-table/selectStatus";
import FiltersSearchSheets from "@/components/sheets/FiltersSearchSheets";
import Search from "@/components/forms/Search";
import { Divider } from "@nextui-org/react";
import { Suspense } from "react";
import PaginationControls from "@/components/table/PaginationControlsx";
import { createApiSettingRepository } from "@/modules/settings/service/service-setting";
export default async function Page({ searchParams }: PageProps) {

    const supabase = await createClient()
    const { error } = await supabase.auth.getUser()
    const { date, query, page, per_page, status } = coordinatesCache.parse(searchParams)

    if (error) {
        redirect("/login")
    }
    return (
        <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>
            <div className='flex flex-row gap-2 justify-between'>
                <div>
                    <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Administradores</h1>
                </div>
            </div>
            <Divider />
            <div className='flex flex-col sm:flex-row gap-2 justify-start sm:justify-between mb-3'>

                <div className='sm:w-80 w-full'>
                    <Search placeholder='Buscar por nombre...' />
                </div>

                <div className='sm:w-80 w-full'>
                    <SelectStatus options={[
                        { label: 'Activo', value: 'activo' },
                        { label: 'Inactivo', value: 'inactivo' },

                    ]} />
                </div>

                <div className='sm:w-80 w-full'>
                    <FiltersSearchSheets />
                </div>



            </div>
            <ListAdministrator
                date={date}
                page={page}
                per_page={per_page}
                query={query}
                status={status}
            ></ListAdministrator>


            <Suspense fallback={<div>cargando</div>}>
                <FechtRenderPaginationControls
                    selectedDate={date}
                    page={page}
                    per_page={per_page}
                    query={query}

                    status={status} />
            </Suspense>

        </div>

    )
}

async function FechtRenderPaginationControls({ selectedDate, query, status, page, per_page }: {  selectedDate: string, query: string, status: string, page: string, per_page: string }) {
    const repository = createApiSettingRepository();
    const countAdministrator = await repository.getCountAdministrator(selectedDate, query, status);    

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