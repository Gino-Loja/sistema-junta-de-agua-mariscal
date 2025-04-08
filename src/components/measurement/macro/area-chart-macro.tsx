'use client'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { parseDateTime } from '@internationalized/date';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-medium text-sm mb-1">{label}</p>
        <p className="text-sm">
          <span className="font-semibold">Consumo:</span>{' '}
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function MacroMeasurementAreaChart({ data }: { data: { fecha: Date, consumo: number }[] }) {
    const { theme } = useTheme();
    
    // Format the dates in the data with time
    const formattedData = data.map(item => {
        try {
            const dateTime = parseDateTime(item.fecha.toDateString());
            
            return {
                ...item,
                fecha: `${dateTime.day}/${dateTime.month}/${dateTime.year} ${dateTime.hour}:${String(dateTime.minute).padStart(2, '0')}`
            };
        } catch (e) {
            return {
                ...item,
                fecha: item.fecha.toLocaleString()
            };
        }
    });

    const gradientOffset = () => {
      const dataMax = Math.max(...data.map((i) => i.consumo));
      const dataMin = Math.min(...data.map((i) => i.consumo));
      
      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }
      return dataMax / (dataMax - dataMin);
    };

    return (
        <div className="h-96 w-full">
            <Card radius='sm' shadow='none'  className="w-full h-full border shadow">
                <CardHeader className="px-6 py-4">
                    <h3 className="text-xl font-semibold text-default-900">
                        Consumo de General
                    </h3>
                </CardHeader>
                <Divider />
                <CardBody className="p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={formattedData}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                vertical={false}
                                stroke={theme === 'dark' ? '#334155' : '#e2e8f0'}
                            />
                            <XAxis 
                                dataKey="fecha" 
                                style={{ 
                                    fontSize: '12px',
                                    fill: theme === 'dark' ? '#94a3b8' : '#64748b'
                                }}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                style={{
                                    fontSize: '12px',
                                    fill: theme === 'dark' ? '#94a3b8' : '#64748b'
                                }}
                                tickLine={false}
                                axisLine={false}
                                dx={-10}
                            />
                            <Tooltip 
                                content={<CustomTooltip />}
                                cursor={{
                                    stroke: theme === 'dark' ? '#475569' : '#cbd5e1',
                                    strokeWidth: 1,
                                    strokeDasharray: '4 4'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="consumo"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#colorConsumo)"
                                animationDuration={1500}
                                animationEasing="ease-out"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div>
    );
}