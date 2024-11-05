'use client'
import { Lectures, Years } from "@/model/types";
import {
    Select, SelectItem
} from "@nextui-org/react";


export default function FiltersSearchLectures({ years }: { years: Years[] }) {
    
    
    //const [name, setName] = useQueryState('year')
    // Route -> /shop/[tag]/[item]
    // URL -> /shop/shoes/nike-air-max-97
    // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
                disallowEmptySelection
                label="Select an animal"
                className="max-w-xs"
            >
                {years.map((date, id) => (
                    <SelectItem onPress={() => setName(date.anio.toString())} value={date.anio} key={id}>{date.anio}</SelectItem>
                ))}
            </Select>

            <Select
                label="Favorite Animal"
                placeholder="Select an animal"
                className="max-w-xs"
            >
                <SelectItem value="dog" key={"2"}>Dog</SelectItem>
            </Select>
        </div>
    );
}