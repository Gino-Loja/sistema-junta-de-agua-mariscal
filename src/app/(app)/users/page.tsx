'use server'

import dynamic from 'next/dynamic';
import MetricsUser from '@/components/user/MetricsUser';
import TableUser from '@/components/user/TableUser';
import { Suspense } from 'react';
import { IUserRepository } from '@/model/user-repository/UserRepository';
import { createApiUserRepository } from '@/services/serviceUser';
import PaginationControls from '@/components/table/PaginationControlsx';
import { Divider } from '@nextui-org/react';
import Search from '@/components/forms/Search';
import { PageProps } from '@/modules/types';
import { coordinatesCache } from '@/modules/searchParams';
import LoadingIcon from '@/components/icons/loading-icon';
import { getSectors } from '@/modules/incident/utils/use-media-query';
import SelectParams from '@/components/filters-table/SelectParams';
import SelectStatus from '@/components/filters-table/selectStatus';

const SkeletonCustom = dynamic(() =>
  import('@/components/skeletons/skeleton').then((mod) => mod.default)
)
const SkeletonMetricUser = dynamic(() =>
  import('@/components/skeletons/SkeletonsMetricUser').then((mod) => mod.default)
)

const FormAddUser = dynamic(() =>
  import('@/components/forms/FormUser').then((mod) => mod.default)
)

const FormModal = dynamic(() =>
  import('@/components/modal/FormModal').then((mod) => mod.default)
)


export default async function Page({ searchParams }: PageProps) {
  const { query, page, per_page, sector, status } = coordinatesCache.parse(searchParams)

  const repositoryUser: IUserRepository = createApiUserRepository();
  const sectores = await repositoryUser.getAllSector();
  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page)
  const data = await repositoryUser.getAllPagination(query, sector, status)

  return <div className='flex flex-col overflow-hidden gap-4 px-4 pb-4'>
    {sectores.success && (<FormModal
    >
      <FormAddUser sectores={sectores.data}></FormAddUser>
    </FormModal>)}
    <div className='mb-4'>
      <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Resumen</h1>
    </div>

    <Divider />

    <Suspense fallback={<SkeletonMetricUser />}>
      <MetricsUser />
    </Suspense>
    <div className='flex flex-row gap-2 justify-between mt-5'>
      <div>
        <h1 className="text-2xl font-bold shrink p-1 max-w-42 border-divider rounded-xl">Lista de usuarios</h1>
      </div>

      <div className='min-w-[250px]' >
        <Search placeholder='Buscar usuario ...' />
      </div>
      <div className='min-w-[250px]'>
        <SelectStatus key={'select-params-status'} options={[{
          label: 'Activo',
          value: 'activo'
        },
        {
          label: 'Inactivo',
          value: 'inactivo'
        }]} />
      </div>
      <div className="w-full sm:w-80 min-w-[200px]">
        <Suspense fallback={<LoadingIcon />}>
          <GetSectorSelector />
        </Suspense>
      </div>
    </div>
    <Divider />

    <Suspense key={page + query + per_page} fallback={<SkeletonCustom />}>
      <TableUser repository={repositoryUser}
        page={page}
        per_page={per_page}
        query={query}
        sector={sector}
        estado={status}
      ></TableUser>
    </Suspense>

    {data && data.success && <PaginationControls total={data.data[0].total_usuarios} hasNextPage={end < data.data[0].total_usuarios}
      hasPrevPage={start > 0} />}


  </div>
}

async function GetSectorSelector() {
  const sector = await getSectors();
  return (
    sector.success &&
    <SelectParams key={'select-params-sector'} options={sector.data} />
  )
}