import { auth } from "@/auth";
import FormAdministrator from "@/modules/settings/ui/administrator/form-administrator";


export default async function Page() {
    const session = await auth()

    if (!session?.user) {
        return <div>No tiene permitido acceder a esta página</div>
    }


    return (
        <FormAdministrator user={{
            id: session?.user.id!,
            name: session?.user.name!,
            email: session?.user.email!
        }} />

    )
}