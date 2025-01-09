'use client';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from "next-themes";

const COLORS = ['#0EA5E9', '#F97316', '#10B981', '#8B5CF6'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
                <p className="text-xs text-gray-900">{`${payload[0].name}: ${payload[0].value} m³`}</p>
            </div>
        );
    }
    return null;
};

export default function MeasurementPieChart({ sectors }: { sectors: { sector: string, consumo: number }[] }) {
    const { theme } = useTheme();

    return (
        <div className="w-full ">

            <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={sectors}
                            outerRadius={55}
                            innerRadius={35}
                            dataKey="consumo"
                            cx="50%"
                            cy="50%"
                            nameKey="sector"
                            label={({ sector, consumo, cx, cy, midAngle, innerRadius, outerRadius }) => {
                                const radius = outerRadius + 10;
                                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        textAnchor={x > cx ? 'start' : 'end'}
                                        dominantBaseline="central"
                                        className={`text-[12px] ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
                                    >
                                        {`${consumo} m³`}
                                    </text>
                                );
                            }}
                            labelLine={({ cx, cy, midAngle, outerRadius }) => {
                                const RADIAN = Math.PI / 180;
                                const startRadius = outerRadius;
                                const endRadius = outerRadius + 8;
                                const startX = cx + startRadius * Math.cos(-midAngle * RADIAN);
                                const startY = cy + startRadius * Math.sin(-midAngle * RADIAN);
                                const endX = cx + endRadius * Math.cos(-midAngle * RADIAN);
                                const endY = cy + endRadius * Math.sin(-midAngle * RADIAN);
                                return (
                                    <line
                                        x1={startX}
                                        y1={startY}
                                        x2={endX}
                                        y2={endY}
                                        className={`${theme === 'dark' ? 'stroke-white' : 'stroke-black'}`}
                                        strokeWidth={0.5}
                                    />
                                );
                            }}
                        >
                            {sectors.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    className="transition-all duration-300 hover:opacity-80"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}