import NavigationTabs from "@/components/NavigationTabs"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
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