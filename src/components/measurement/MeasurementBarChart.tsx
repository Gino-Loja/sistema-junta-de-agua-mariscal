'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';

export function MeasurementBarChart({ data }: { data: { mes: string, consumo_total: number, exceso_total: number }[] }) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">
                {entry.dataKey === 'consumo_total' ? 'Consumo Total' : 'Exceso Total'}: 
              </span>
              <span className="font-medium text-gray-900">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="overflow-hidden border">
        <div className="space-y-2 p-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Consumo General
          </h2>
          <p className="text-muted-foreground">
            Registro del consumo total de agua correspondiente a los sectores
          </p>
        </div>
        <CardBody>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorExceso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  className="stroke-gray-200"
                  vertical={false}
                />
                <XAxis 
                  dataKey="mes" 
                  className="text-sm font-medium"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-sm font-medium"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Area
                  type="monotone"
                  dataKey="consumo_total"
                  name="Consumo Total"
                  stroke="#0EA5E9"
                  fill="url(#colorConsumo)"
                  strokeWidth={2}
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="exceso_total"
                  name="Exceso Total"
                  stroke="#F97316"
                  fill="url(#colorExceso)"
                  strokeWidth={2}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


// export default function Index() {
//   const data = [
//     { mes: 'Enero', consumo_total: 30, exceso_total: 20 },
//     { mes: 'Febrero', consumo_total: 45, exceso_total: 30 },
//     { mes: 'Marzo', consumo_total: 35, exceso_total: 25 },
//     { mes: 'Abril', consumo_total: 50, exceso_total: 35 },
//     { mes: 'Mayo', consumo_total: 40, exceso_total: 28 },
//     { mes: 'Junio', consumo_total: 55, exceso_total: 40 },
//   ];

//   return (
//     <div className="container mx-auto py-8">
//       <MeasurementBarChart data={data} />
//     </div>
//   );
// }