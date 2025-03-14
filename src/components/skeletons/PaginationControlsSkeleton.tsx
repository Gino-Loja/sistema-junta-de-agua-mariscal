'use client'

import { Skeleton } from '@nextui-org/react'

const PaginationControlsSkeleton = () => {
  return (
    <div className='flex w-full'>
      <div className="flex w-full justify-between items-center px-5 pb-2 gap-4">
        {/* Contador de página */}
        <Skeleton className="h-4 w-20 rounded-lg" />
        
        {/* Paginación */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
        </div>
        
        {/* Selector de items por página */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-10 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-medium" />
        </div>

        {/* Botones (solo en desktop) */}
        <div className="hidden sm:flex gap-2 w-[30%] justify-end">
          <Skeleton className="h-10 w-24 rounded-medium" />
          <Skeleton className="h-10 w-24 rounded-medium" />
        </div>
      </div>
    </div>
  )
}

export default PaginationControlsSkeleton