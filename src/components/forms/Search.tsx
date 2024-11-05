'use client';

import { Input } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {

    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');
    params.set('per_page', '10')


    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (

    <Input
      placeholder={placeholder}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      isClearable
      onClear={() => {    
        handleSearch('');
      }}

      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}