'use client'
import { useDeleteStore } from "@/lib/store";
import {  Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

export default function FormModalDelete({ children }: { children: React.ReactNode }) {
    const { isOpen, closeModalDelete, openModalDelete } = useDeleteStore();

    const onOpenChange = (open: boolean) => {
        if (open) {
            openModalDelete();
        } else {
            closeModalDelete();
        }
    };
    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(closeModal) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody >
                                {children}
                            </ModalBody>
                        
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}   