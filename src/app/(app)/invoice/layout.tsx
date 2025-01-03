import NavigationTabs from "@/components/NavigationTabs"
import { FileText, ScrollText } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <NavigationTabs links={
            [{
                url: "/invoice/",
                title: "Factura",
                icon: <ScrollText />,
            },
            {
                url: "/invoice/table",
                title: "Ver Facturas",
                icon: <FileText />,
            },
            ]
        } ></NavigationTabs>
        {children}
    </section>
}