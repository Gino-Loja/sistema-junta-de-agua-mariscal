'use client';
import { useQueryStates } from 'nuqs'
import { coordinatesParsers } from '@/modules/searchParams';
import { Input } from '@nextui-org/react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {




  const [{ query }, setCoordinates] = useQueryStates(coordinatesParsers, {
    history: 'replace',
    // Sin la opción 'navigate: true'
    shallow: false  // Esta es la opción que reemplaza 'navigate'
  });

  //const [search, setSearch] = useQueryState('query');


  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      setCoordinates({ query: term,page: null })
    } else {
      setCoordinates({ query: null, page: null })
    }
  }, 100);

  return (

    <Input
      radius='sm'
      size='md'
      placeholder={placeholder}
      value={query} // Cambia de defaultValue a value
      onChange={(e) => handleSearch(e.target.value)}
      isClearable
      onClear={() => handleSearch('')}
    />
  );
}