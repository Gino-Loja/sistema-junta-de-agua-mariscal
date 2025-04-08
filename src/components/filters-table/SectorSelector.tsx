'use client'

import { Select, SelectItem } from "@nextui-org/react";

export default  async function SectorSelector({ sectors }: { sectors: { value: string, label: string }[] }) {
    
   
    return (
        <div className=" w-40">
            <Select 
                radius='sm'
                 size='sm'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    console.log(e.target.value)
                    
                }}
                className="max-w-xs"
            >
                {
                    sectors.map((item) => (
                        <SelectItem key={item.value} className="capitalize">
                            {item.label}
                        </SelectItem>
                    ))
                }
            </Select>
        </div>
    );
}