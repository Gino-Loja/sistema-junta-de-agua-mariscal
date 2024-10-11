'use client'
import { useUserStore } from "@/lib/store";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export default function FormModal({ children }: { children: React.ReactNode }) {
    const { isOpen, closeModal, openModal } = useUserStore();

    const onOpenChange = (open: boolean) => {
        if (open) {
            openModal();
        } else {
            closeModal();
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