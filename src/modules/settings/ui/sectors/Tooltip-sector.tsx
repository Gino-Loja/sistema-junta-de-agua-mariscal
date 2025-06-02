'use client'
import { AddIcon } from "@/components/icons/add-icon";
import FormModal from "@/components/modal/FormModal";
import { useUserStore } from "@/lib/store";
import { Button, Tooltip } from "@nextui-org/react";
import dynamic from "next/dynamic";
const FormUpdate = dynamic(() => import('./form-update-sectors').then(mod => mod.FormUpdateSectors))
const FormAdd = dynamic(() => import('./form-add-sectors').then(mod => mod.FormAddSectors))
export default function TooltipSectors() {
    const { openModal, type, setType } = useUserStore();

    let RenderForm = type === 'update' ? FormUpdate : FormAdd;

    return (
        <div>
            <FormModal key={`update`}>
                <RenderForm />
            </FormModal>
            <Tooltip content="Agrega un nuevo sector">
                <Button radius="full" onPress={() => {
                    setType('create')

                    openModal()
                }} isIconOnly about="agregar" color="primary" aria-label="Like">
                    <AddIcon />
                </Button>
            </Tooltip>
        </div>

    )
}