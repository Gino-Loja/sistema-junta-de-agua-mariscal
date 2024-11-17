'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs'
export function Demo() {
    const [hello, setHello] = useQueryState('hello', { defaultValue: '' })
    const [count, setCount] = useQueryState(
        'count',
        parseAsInteger.withDefault(0)
    )

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch = (term: string) => {

        const params = new URLSearchParams(searchParams.toString());


        if (term) {
            params.set('name', term);
        } else {
            params.delete('name');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <>
            <button
                onClick={() => setCount(c => c + 1)}
            >
                Count: {count}
            </button>
            <input
                value={hello}
                placeholder="Enter your name"
                onChange={e => setHello(e.target.value || null)}
            />


            <input
                placeholder="Enter "
                onChange={e => handleSearch(e.target.value )}
            />
           
        </>
    )
}
