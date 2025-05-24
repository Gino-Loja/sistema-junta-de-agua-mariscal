import NavigationTabs from "@/components/NavigationTabs"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className="relative min-h-screen">
        <NavigationTabs links={
            [{
                url: "/sheets",
                title: "Resumen",
            },
            {
                url: "/sheets/tableSheets",
                title: "Planillas",
            }]
        } ></NavigationTabs>
            {children}


    </section>
}