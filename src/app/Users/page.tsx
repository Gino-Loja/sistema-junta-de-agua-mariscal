'use server'
import Breadcrumbs from '@/components/Breadcrumbs';
import { SkeletonCustom } from '@/components/skeletons/skeleton';
import MetricsUser from '@/components/user/MetricsUser';
import TableUser from '@/components/user/TableUser';
import { SkeletonMetricUser } from '@/components/skeletons/SkeletonsMetricUser';
import { Suspense } from 'react';

export default async function Users() {
  return <div>

    <Suspense fallback={<SkeletonMetricUser />}>
      <MetricsUser />
    </Suspense>
    <TableUser />


  </div>
}

