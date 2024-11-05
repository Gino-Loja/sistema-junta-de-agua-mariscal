'use client'

import { FC } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button, Pagination } from '@nextui-org/react'
import { ITEMS_PER_PAGE } from '@/model/Definitions'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  total: number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    total
  }
) => {
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? ITEMS_PER_PAGE


  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  return (
    <div className='flex w-full'>
      <div className="flex w-full justify-between items-center px-5 pb-2">
        <span className="w-[30%] text-small text-default-400">
          {page} / {Math.ceil(total / Number(per_page))}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={Number(page)}
          total={Math.ceil(total / Number(per_page))}
          onChange={(value) => {

            params.set('page', `${Number(value)}`);
            params.set('per_page', `${per_page}`);

            replace(`${pathname}?${params.toString()}`);
          }}
        />
        <select
          onChange={(e) => {
            params.set('page', '1');
            params.set('per_page', `${e.target.value}`);
            replace(`${pathname}?${params.toString()}`);
          }}
        
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={!hasPrevPage} size="sm" variant="flat" onPress={
            () => {
              //router.push(`/users?page=${Number(page) - 1}&per_page=${per_page}`)
              params.set('page', `${Number(page) - 1}`); // Establece el año
              params.set('per_page', `${per_page}`); // Establece el mes

              //params.set('month', month); // Establece el mes
              replace(`${pathname}?${params.toString()}`);
            }
          }>
            Anterior
          </Button>
          <Button isDisabled={!hasNextPage} size="sm" variant="flat" onPress={(() => {
            params.set('page', `${Number(page) + 1}`);
            params.set('per_page', `${per_page}`);
            replace(`${pathname}?${params.toString()}`);
            //router.push(`users/?page=${Number(page) + 1}&per_page=${per_page}`)
          }
          )}
          >
            Siguiente
          </Button>
        </div>


      </div>

    </div>
  )
}

export default PaginationControls