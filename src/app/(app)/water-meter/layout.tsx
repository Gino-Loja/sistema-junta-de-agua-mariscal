import NavigationTabs from "@/components/NavigationTabs"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <section>
            <NavigationTabs links={
                [
                {
                    url: "/water-meter",
                    title: "Resumen",
                },
                {
                    url: "/water-meter/table",
                    title: "Medidores",
                },
            ]
            } ></NavigationTabs>

        </section>
        {children}
    </>


}