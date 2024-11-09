import NavigationTabs from "@/components/NavigationTabs"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <NavigationTabs links={
            [{
                url: "/measurement",
                title: "Resumen",
            },
            {
                url: "/measurement/table",
                title: "Lecturas",
            },
        ]
        } ></NavigationTabs>
        {children}
    </section>
}