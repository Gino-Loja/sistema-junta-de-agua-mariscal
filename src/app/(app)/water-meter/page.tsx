import WaterMeterBarchar from "@/components/water-meter/WaterMeterBarchar";
import WaterMeterMetric from "@/components/water-meter/WaterMeterMetric";
import { IWaterMeter } from "@/model/water-meter/WaterMeterRepository";
import { createApiWaterMeter } from "@/services/waterMeterService";
import { Divider } from "@nextui-org/react";
import { Suspense } from "react";

export default function Page() {
    const repositoryWaterMeter: IWaterMeter = createApiWaterMeter();
    
    
    

    return (
        <div className="px-4 h-full ">
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-2 justify-between'>
                    <div>
                        <h1 className="text-2xl font-bold shrink p-1 border-divider rounded-xl">Lista de Medidores</h1>
                        <div className='sm:w-80 w-full'>
                        </div>
                    </div>
                </div>
            </div>
            <Divider className="my-3" />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:h-5/6 ">
                <div className="col-span-2 h-full">
                    <Suspense key={'water-meter-by-type'} fallback={<div>Loading...</div>}>
                        {renderWaterMeterByType({ repository: repositoryWaterMeter })}
                    </Suspense>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                    <span className="text-default-900 text-xl font-semibold justify-self-start">
                        Medidores distribuidos por sector
                    </span>
                    <Suspense key={'water-meter-by-sector'} fallback={<div>Loading...</div>}>
                        {renderWaterMeterBySector({ repository: repositoryWaterMeter })}
                    </Suspense>
                    <span className="text-default-900 text-xl font-semibold justify-self-start">
                        Estado de los medidores
                    </span>

                    <Suspense key={'water-meter-by-status'} fallback={<div>Loading...</div>}>
                        {renderWaterMeterByStatus({ repository: repositoryWaterMeter })}
                    </Suspense>
                </div>
            </div>
        </div>

    )


}

async function renderWaterMeterByType({ repository }: { repository: IWaterMeter }) {

    const waterMeterByType = await repository.getWaterMeterbyType();
    return (waterMeterByType.success && <WaterMeterBarchar data={waterMeterByType.data} />)
}

async function renderWaterMeterBySector({ repository }: { repository: IWaterMeter }) {
    const waterMeterBySector = await repository.getWaterMeterbySector();
    const colors = ["bg-blue-500", "bg-purple-500"];
    return (waterMeterBySector.success && <WaterMeterMetric colors={colors} label="Total de medidores" data={waterMeterBySector.data} />)

}

async function renderWaterMeterByStatus({ repository }: { repository: IWaterMeter }) {
    const waterMeterByStatus = await repository.getWaterMeterbyStatus();
    const colors = ['bg-red-500', 'bg-green-500'];
    return (waterMeterByStatus.success && <WaterMeterMetric colors={colors} label="Total por estado" data={waterMeterByStatus.data} />)

}
