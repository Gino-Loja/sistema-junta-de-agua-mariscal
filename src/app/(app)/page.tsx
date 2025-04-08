import YearSN from "@/components/filters-table/YearSN";
import { createApiDashboardRepository } from "@/modules/dashboard/service/service-dashboard";
import { RateCard } from "@/modules/dashboard/ui/rate-card";
import SkeletonRateCard from "@/modules/dashboard/ui/skeleton-rate-card";
import SkeletonStatsCard from "@/modules/dashboard/ui/skeleton-stats-card";
import { StatsCard } from "@/modules/dashboard/ui/stats-cars";
import { IServiceDashboardRepository } from "@/modules/dashboard/utils/model";
import { coordinatesCache } from "@/modules/searchParams";
import { PageProps } from "@/modules/types";
import { AlertCircleIcon, CircleDollarSign, FileTextIcon, HomeIcon, ReceiptIcon, UserIcon } from "lucide-react";
import { Suspense } from "react";


export default function Page({ searchParams }: PageProps) {
  const { date, yr } = coordinatesCache.parse(searchParams)

  const repository = createApiDashboardRepository();

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            Resumen
          </h2>

          <div className='min-w-40'>
            <YearSN />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <Suspense fallback={<SkeletonStatsCard />}>
            <GetRenderTotalIncident repository={repository} date={yr}></GetRenderTotalIncident>
          </Suspense>
          <Suspense fallback={<SkeletonStatsCard />}>
            < GetRenderTotalInvoice repository={repository} date={yr}></GetRenderTotalInvoice>
          </Suspense>
          <Suspense fallback={<SkeletonStatsCard />}>
            <GetRenderTotalSheets repository={repository} date={yr}></GetRenderTotalSheets>
          </Suspense>
          <Suspense fallback={<SkeletonStatsCard />}>
            <GetRenderTotalWaterMeter repository={repository} date={yr}></GetRenderTotalWaterMeter>
          </Suspense>
          <Suspense fallback={<SkeletonStatsCard />}>
            <GetRenderTotalUser repository={repository} ></GetRenderTotalUser>
          </Suspense>

          <Suspense fallback={<SkeletonStatsCard />}>
            <GetRenderAmountInvoice repository={repository} date={yr}></GetRenderAmountInvoice>
          </Suspense>
          <Suspense fallback={<SkeletonStatsCard />}>
            <GetRenderAmountIncident repository={repository} date={yr}></GetRenderAmountIncident>
          </Suspense>
          <Suspense fallback={<SkeletonStatsCard />}>
            < GetRenderAmountSheets repository={repository} date={yr}></GetRenderAmountSheets>
          </Suspense>




        </div>

        <div className="relative">
          {/* <RateCard rate={getRate} /> */}
          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <SkeletonRateCard key={index} />
            ))}
          </div>}>
            <GetRenderRate repository={repository}></GetRenderRate>
          </Suspense>
        </div>
      </div>
    </div>
  );
}


async function GetRenderTotalIncident({ repository, date }: { repository: IServiceDashboardRepository, date: number | null }) {
  const totalIncident = await repository.getTotalIncident(date);

  if (!totalIncident.success) {
    return <div>Error al obtener los datos</div>
  }
  return (<StatsCard

    title="Total de Incidentes"
    value={totalIncident.data}
    description={`Incidentes reportados`}

  >
    <div className="p-3 rounded-full bg-danger ">
      <AlertCircleIcon className="h-6 w-6  " />
    </div>
  </StatsCard>
  )
}

async function GetRenderTotalInvoice({ repository, date }: { repository: IServiceDashboardRepository, date: number | null }) {
  const totalInvoice = await repository.getTotalInvoice(date);

  if (!totalInvoice.success) {
    return <div>Error al obtener los datos</div>
  }

  return (<StatsCard
    title="Facturas Emitidas"
    value={totalInvoice.data}
    description={`Facturas totales`}
  >

    <div className="p-3 rounded-full bg-primary-300 ">
      <ReceiptIcon className="h-6 w-6 " />
    </div>
  </StatsCard>
  )
}

async function GetRenderTotalSheets({ repository, date }: { repository: IServiceDashboardRepository, date: number | null }) {
  const totalSheets = await repository.getTotalSheets(date);

  if (!totalSheets.success) {
    return <div>Error al obtener los datos</div>
  }
  return (<StatsCard
    title="Total de Planillas"
    value={totalSheets.data}
    description={`Planillas emitidas`}
  >
    <div className="p-3 rounded-full bg-primary-300 ">
      <FileTextIcon className="h-6 w-6 " />
    </div>
  </StatsCard>
  )
}

async function GetRenderTotalWaterMeter({ repository, date }: { repository: IServiceDashboardRepository, date: number | null }) {
  const totalWaterMeter = await repository.getTotalWaterMeter(date);

  if (!totalWaterMeter.success) {
    return <div>Error al obtener los datos</div>
  }

  return (<StatsCard
    title="Consumo de agua"
    value={totalWaterMeter.data + ' m³'}
    description={`Total de consumo de agua`}
  >
    <div className="p-3 rounded-full bg-primary-300 ">
      <HomeIcon className="h-6 w-6 " />
    </div>
  </StatsCard>
  )
}


async function GetRenderTotalUser({ repository }: { repository: IServiceDashboardRepository }) {
  const totalUser = await repository.getTotalUser();

  if (!totalUser.success) {
    return <div>Error al obtener los datos</div>
  }

  return (<StatsCard
    title="Usuarios"
    value={totalUser.data}
    description={`Usuarios registrados`}
  >
    <div className="p-3 rounded-full bg-primary-500 ">
      <UserIcon className="h-6 w-6" />

    </div>

  </StatsCard>
  )
}

//amount
async function GetRenderAmountInvoice({ repository, date }: { repository: IServiceDashboardRepository, date: number | null }) {
  const amountInvoice = await repository.getAmountInvoice(date);


  if (!amountInvoice.success) {
    return <div>Error al obtener los datos</div>
  }

  return (<StatsCard
    title="Dinero de planillas"
    value={amountInvoice.data.toFixed(2)}
    description={`Dinero por cobrar de planillas`}
  >
    <div className="p-3 rounded-full bg-success-500 ">
      <CircleDollarSign className="h-6 w-6" />

    </div>

  </StatsCard>
  )
}

async function GetRenderAmountIncident({ repository, date }: { repository: IServiceDashboardRepository, date: number | null }) {
  const amountIncident = await repository.getAmountIncident(date);

  if (!amountIncident.success) {
    return <div>Error al obtener los datos</div>
  }

  return (<StatsCard
    title="Gastos de incidentes"
    value={amountIncident.data.toFixed(2)}
    description={`Monto gastado de incidentes`}
  >
    <div className="p-3 rounded-full bg-danger-500 ">
      <CircleDollarSign  className="h-6 w-6" />

    </div>  </StatsCard>
  )
}

async function GetRenderAmountSheets({ repository, date }: { repository: IServiceDashboardRepository, date: number | null}) {
  const amountSheets = await repository.getAmountSheets(date);

  if (!amountSheets.success) {
    return <div>Error al obtener los datos</div>
  }
  return (<StatsCard
    title="Ingresos en Planillas"
    value={amountSheets.data.toFixed(2)}
    description={`Monto recaudado de planillas`}
  >
    <div className="p-3 rounded-full bg-success-500 ">
      <CircleDollarSign className="h-6 w-6" />

    </div>  </StatsCard>
  )
}

async function GetRenderRate({ repository }: { repository: IServiceDashboardRepository }) {
  const rate = await repository.getRate();


  if (!rate.success) {
    return <div>Error al obtener los datos</div>
  }
  return (

    <RateCard rate={rate.data} ></RateCard>
  )
}