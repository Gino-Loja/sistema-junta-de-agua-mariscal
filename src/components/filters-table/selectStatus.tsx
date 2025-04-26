'use client'
import { coordinatesParsers } from '@/modules/searchParams';
import { Select, SelectItem } from '@nextui-org/react';
import { useQueryStates } from 'nuqs';

export default function SelectStatus({ options }: { options: { label: string, value: string }[] }) {

    const [{ status }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCoordinates({ status: e.target.value, page: null })
    };

    return (
        <Select
            aria-label="Selecciona un estado"
            label="Selecciona un estado"
            labelPlacement='outside-left'
            size='sm'
            radius='sm'
            selectedKeys={[status]}
            onChange={handleSelectionChange}
        >
            {options.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
        </Select>



    );
}
