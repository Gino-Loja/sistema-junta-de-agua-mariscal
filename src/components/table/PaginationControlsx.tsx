'use client'

import { FC } from 'react'
import { Button, Pagination, Select, SelectItem } from '@nextui-org/react'
import { useQueryStates } from 'nuqs'
import { coordinatesParsers } from '@/modules/searchParams'

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
  const [{ page, per_page }, setCoordinates] = useQueryStates(coordinatesParsers, {
    history: 'replace',
    shallow: false
  });

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

            // params.set('page', `${Number(value)}`);
            // params.set('per_page', `${per_page}`);

            // replace(`${pathname}?${params.toString()}`);
            setCoordinates({ page: `${Number(value)}`, per_page: `${per_page}` })

          }}
        />
        <span className=" text-small text-default-400">
          Ver
        </span>
        <Select
          size="sm"
          selectedKeys={[per_page.toString()]}
          disallowEmptySelection
          className="max-w-20"
          onChange={(e) => {
            // params.set('page', '1');
            // params.set('per_page', `${e.target.value}`);
            // replace(`${pathname}?${params.toString()}`);
            setCoordinates({ page: '1', per_page: `${e.target.value}` })
          }}

        >
          {[10, 20, 30, 40, 50, 100].map(pageSize => (
            <SelectItem key={pageSize.toString()} value={pageSize.toString()} className="capitalize">
              {pageSize.toString()}
            </SelectItem>
          ))}
        </Select>
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={!hasPrevPage} size="sm" variant="flat" onPress={
            () => {
              //router.push(`/users?page=${Number(page) - 1}&per_page=${per_page}`)
              // params.set('page', `${Number(page) - 1}`); // Establece el año
              // params.set('per_page', `${per_page}`); // Establece el mes

              // //params.set('month', month); // Establece el mes
              // replace(`${pathname}?${params.toString()}`);
              setCoordinates({ page: `${Number(page) - 1}`, per_page: `${per_page}` })
            }
          }>
            Anterior
          </Button>
          <Button isDisabled={!hasNextPage} size="sm" variant="flat" onPress={(
            () => {
              // params.set('page', `${Number(page) + 1}`);
              // params.set('per_page', `${per_page}`);
              // replace(`${pathname}?${params.toString()}`);
              //router.push(`users/?page=${Number(page) + 1}&per_page=${per_page}`)
              setCoordinates({ page: `${Number(page) + 1}`, per_page: `${per_page}` })

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