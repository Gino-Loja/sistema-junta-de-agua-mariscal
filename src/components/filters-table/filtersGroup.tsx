'use client'
import { Popover, PopoverTrigger, PopoverContent, Button, Input }
    from '@nextui-org/react';
import { ListFilter } from 'lucide-react';

interface FiltersGroupProps {
    children: JSX.Element;

}
export default function FiltersGroup({
    children
}: FiltersGroupProps) {
    return (
        <Popover radius='sm'>
            <PopoverTrigger>
                <Button isIconOnly>
                    <ListFilter className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>

                {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                            Filtros
                        </p>
                        <div className="px-1 py-2 w-full">
                            <div className="flex flex-col justify-start gap-2 w-full">
                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}