'use client'
import { coordinatesParsers } from '@/modules/searchParams';
import { Select, SelectItem } from '@nextui-org/react';
import { useQueryStates } from 'nuqs';

export default function SelectParams({ options }: { options: { label: string, value: string }[] }) {

    const [{ sector }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false  
    });

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCoordinates({ sector: e.target.value })
    };

    return (
        <Select
            selectedKeys={[sector]}
            labelPlacement='outside-left'
            //defaultSelectedKeys={[sector]}
            label=" filtro de Sector"

            onChange={
                handleSelectionChange
            }
        >
            {options.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
        </Select>
    );
}

