'use client'
import { coordinatesParsers } from '@/modules/searchParams';
import { Select, SelectItem } from '@nextui-org/react';
import { useQueryStates } from 'nuqs';

export default function TypeSelector({ options }: { options: { label: string, value: string }[] }) {

    const [{ type }, setCoordinates] = useQueryStates(coordinatesParsers, {
        history: 'replace',
        shallow: false
    });

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCoordinates({ type: e.target.value, page: null })
    };

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-center">Tipo de Medidor</label>
            <Select
                selectedKeys={[type]}
                placeholder="Selecciona un estado"
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
