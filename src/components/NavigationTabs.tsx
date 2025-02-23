"use client";

import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavigationTabsProps {
    links: { url: string, title: string, icon?: React.ReactNode }[];
}

export default function NavigationTabs({ links }: NavigationTabsProps) {

    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="flex w-full flex-col p-2">
            <Tabs
                variant="underlined"
                radius="md"
                color={'primary'}
                aria-label="Options"
                // selectedKey={links.some(link => link.url === pathname) ? pathname : undefined}
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]",
                }}
            // onSelectionChange={(key) => {
            //     const link = links.find(link => link.url === key);
            //     console.log(link);
            //     if (link) {
            //         window.location.href = link.url;
            //     }
            // }}
            onSelectionChange={(key) => {
                router.push(key as string);
            }}
            >
                {links.map((link) => (
                    <Tab key={link.url} onClick={
                        () => console.log(link.url)
                    }
                        title={
                            <div className="flex items-center space-x-2">
                                <span>{link.icon}</span>
                                <Link href={link.url}>{link.title}</Link>
                            </div>
                        } />
                ))}
            </Tabs>
        </div>
    );
}