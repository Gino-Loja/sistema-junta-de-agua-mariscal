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
        setCoordinates({ sector: e.target.value, page: null })
    };

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-center">Sectores</label>
            <Select
                selectedKeys={[sector]}
                placeholder="Selecciona un sector"
                onChange={handleSelectionChange}
                className="w-full"
            >
                {options.map((option) => (
                    <SelectItem key={option.value}>{option.label}</SelectItem>
                ))}
            </Select>
        </div>



    );
}
