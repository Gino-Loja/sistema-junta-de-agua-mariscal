'use client';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from "next-themes";

// Datos del gráfico
const COLORS = ['#45D483', '#D4D4D8', '#FFBB28', '#FF8042'];
// Función para renderizar el Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#fff', color: '#000', padding: '5px', border: '1px solid #ccc', fontSize: '12px' }}>
                <p>{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export default function LecturePieChart({ sectors }: { sectors: { sector: string, consumo: number }[] }) {

    const { theme } = useTheme()

    return (



        <ResponsiveContainer width="100%" height="100%">
            <PieChart  >
                <Pie
                    overflow={'auto'}
                    data={sectors}
                    outerRadius={40}
                    innerRadius={14}  // Ajustar el radio interior
                    dataKey="consumo"
                    cx="50%"
                    cy="50%"
                    nameKey="sector"
                    label={({ sector, consumo, cx, cy, midAngle, innerRadius, outerRadius }) => {
                        //console.log(consumo)
                        const radius = outerRadius + 12.5; // Ajustar el radio de la etiqueta
                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (



                            <text
                                x={x}
                                y={y}
                                textAnchor={x > cx ? 'start' : 'end'}
                                dominantBaseline="central"
                                style={{ fontSize: '12px', fill: theme == 'dark' ? "#FFFFFF" : "#000000" }} // Ajuste del tamaño de fuente
                            >
                                {`${consumo} m³`}
                            </text>
                        );
                    }}

                    labelLine={({ cx, cy, midAngle, outerRadius }) => {
                        const RADIAN = Math.PI / 180;
                        const startRadius = outerRadius; // La línea comienza en el borde del gráfico
                        const endRadius = outerRadius + 10; // La línea termina fuera del gráfico
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
                                stroke={theme == 'dark' ? "#FFFFFF" : "#000000"}
                                strokeWidth={1}
                            />
                        );
                    }}
                >
                    {sectors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}

                </Pie>
                <Tooltip active content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>


    );
}
