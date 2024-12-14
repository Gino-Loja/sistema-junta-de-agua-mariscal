import { coordinatesCache } from "@/components/hooks/searchParams";
import { CustomSearchParams } from "@/model/types";
import { Demo } from "./exa";

export default async function Page({ params, searchParams }: {
    params: { id: string },
    searchParams: Record<string, string | string[] | undefined> & CustomSearchParams
}) {
    const { id } = coordinatesCache.parse(params)



    return (
        <div className="p-2 w-100">
            {id}
            <Demo/>

        </div>
    );
}