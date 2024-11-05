"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
interface NavigationTabsProps {
    links: { url: string, title: string }[];
}

export default function NavigationTabs({ links }: NavigationTabsProps) {
    
    const pathname = usePathname();
    const router = useRouter();

    const handleTabChange = (key: string) => {
        router.push(key, {scroll: true })
    };

    return (
        <div className="flex w-full flex-col p-4">
            <Tabs
                variant="bordered"
                radius="sm"
                color={'primary'}
                aria-label="Options"
                selectedKey={pathname}
                onSelectionChange={(key) => handleTabChange(key as string)}
            >
                {links.map((link) => (
                    <Tab key={link.url} title={link.title} />
                ))}
                {/* <Tab key="/sheets" title="Resumen" />
                <Tab key="/sheets/tableSheets" title="Planillas" /> */}

            </Tabs>

        </div>
    );
}