'use client'
import { useFormDrawer } from "@/lib/store";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
} from "@nextui-org/react";

export default function DrawerCustom(
    { children, tittle }: { children: React.ReactNode, tittle: string }
) {

    const { isOpen, onOpenChange, onClose } = useFormDrawer()
    return (

        <Drawer backdrop={'blur'} onClose={onClose} placement="right" isOpen={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent >
                <DrawerHeader className="flex flex-col gap-1">
                    {tittle}
                </DrawerHeader>
                <DrawerBody>

                    {children}

                </DrawerBody>


            </DrawerContent>
        </Drawer>
    )
}
