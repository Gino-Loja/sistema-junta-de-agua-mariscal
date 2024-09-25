'use server'

import MetricsUser from '@/components/user/MetricsUser';
import TableUser from '@/components/user/TableUser';
import { SkeletonMetricUser } from '@/components/skeletons/SkeletonsMetricUser';
import { Suspense } from 'react';
import FormModal from '@/components/modal/FormModal';
import FormAddUser from '@/components/forms/FormUser';
//import { getAllSector } from '@/lib/userAction';
import { IUserRepository } from '@/model/user-repository/UserRepository';
import { createApiUserRepository } from '@/services/serviceUser';

import { SkeletonCustom } from '@/components/skeletons/skeleton';

export default async function Users() {
  const repositoryUser: IUserRepository = createApiUserRepository();


  const sectores = await repositoryUser.getAllSector();


  return <div>
    {sectores.success && (<FormModal
    >
      <FormAddUser sectores={sectores.data}></FormAddUser>
    </FormModal>)}

    <Suspense fallback={<SkeletonMetricUser />}>
      <MetricsUser />
    </Suspense>

    <Suspense fallback={<SkeletonCustom />}>
      {fetchAndRenderAllUsers({ repository: repositoryUser })}
    </Suspense>
  </div>
}
async function fetchAndRenderAllUsers({ repository }: { repository: IUserRepository }) {
  const users = await repository.getListAllUser();
  return (
    users.success && <TableUser users={users.data}></TableUser>
  )
}

