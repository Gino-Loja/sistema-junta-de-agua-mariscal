import { createClient } from "@/lib/supabase/server";
import ProfileFormAdministrator from "@/modules/settings/ui/administrator/profile-form-administrator";
import { redirect } from "next/navigation";

export default async function Page() {

    const supabase = await createClient()


    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
        redirect("/login")
    }

    return (
        <div className="overflow-hidden">
            <ProfileFormAdministrator user={{
                nombres: user?.user_metadata?.nombres!,
                celular: user?.user_metadata?.celular!,
                rol: user?.user_metadata?.rol!,
                email: user?.email!,
                estado: user?.user_metadata?.estado!,
                usuario: user?.user_metadata?.usuario!,
            }} />
        </div>


    )
}