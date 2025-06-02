import NavigationTabs from "@/components/NavigationTabs"
import { Building2, CircleUser } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <NavigationTabs links={
            [
                {
                    url: "/setting",
                    title: "Perfil",
                    icon: <CircleUser />,
                    
                },
                {
                    url: "/setting/company",
                    title: "Configuración de Empresa",
                    icon: <Building2 />,
                },
                {
                    url: "/setting/administrator",
                    title: "Administradores",
                },

                {
                    url: "/setting/permissions",
                    title: "Permisos",
                },
                {
                    url: "/setting/sectors",
                    title: "Sectores",
                }
            ]
        } ></NavigationTabs>
        {children}

    </section>
}