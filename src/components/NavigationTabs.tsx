"use client";

import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
interface NavigationTabsProps {
    links: { url: string, title: string }[];
}

export default function NavigationTabs({ links }: NavigationTabsProps) {

    const pathname = usePathname();
    const router = useRouter();
    
    return (
        <div className="flex w-full flex-col p-4">
            <Tabs
                variant="bordered"
                radius="sm"
                color={'primary'}
                aria-label="Options"
                selectedKey={pathname}
            //onSelectionChange={(key) => handleTabChange(key as string)}
            >
                {links.map((link, index) => (
                    <Tab key={link.url} title={
                        <Link href={link.url} >{link.title}</Link>
                    }/>
                ))}
            </Tabs>
        </div>
    );
}