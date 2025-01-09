'use client'
import { useFormDrawer } from "@/lib/store";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
} from "@nextui-org/react";

export default function DrawerCustom(
    { children, tittle, size = 'md' }: { children: React.ReactNode, tittle: string, size? : 'md' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | undefined }
) {

    const { isOpen, onOpenChange, onClose } = useFormDrawer()
    return (

        <Drawer size={size} backdrop={'blur'} onClose={onClose} placement="right" isOpen={isOpen} onOpenChange={onOpenChange}>
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
