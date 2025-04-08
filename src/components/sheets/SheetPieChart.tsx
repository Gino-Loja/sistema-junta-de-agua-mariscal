'use client';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from "next-themes";
import { AlertCircle } from 'lucide-react';

// Update colors to use a light blue scheme
const COLORS = [
    'hsl(200, 89%, 70%)', // Light blue color
    'hsl(200, 89%, 50%)',
    'hsl(200, 89%, 10%)',
    'hsl(200, 89%, 30%)',
    'hsl(200, 89%, 70%)',
    'hsl(200, 89%, 90%)',
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-white p-3 rounded-lg shadow-lg border-none">
                <p className="font-medium text-sm text-gray-900">
                    {payload[0].name}: {payload[0].value.toLocaleString()} m³
                </p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ sectors, theme }: { sectors: { sector_nombre: string, total_recaudado: number }[], theme: string | undefined }) => (
    <div className="flex flex-wrap justify-center">
        {sectors.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
                <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-muted-foreground">
                    {entry.sector_nombre}
                </span>
            </div>
        ))}
    </div>
);

export default function SheetsPieChart({ sectors = [] }: { sectors?: { sector_nombre: string, total_recaudado: number }[] }) {
    const { theme } = useTheme();
    const hasData = sectors && sectors.length > 0 && sectors.some(sector => sector.total_recaudado > 0);

    if (!hasData) {
        return (
            <div className="w-full p-6 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-3">
                    <AlertCircle className="text-destructive h-5 w-5" />
                    <div className="flex flex-col">
                        <p className="text-foreground font-medium">No hay datos disponibles</p>
                        <p className="text-sm text-muted-foreground">Aún no se han registrado ingresos</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
        <div className="h-[300px] w-full"> {/* Aumentamos la altura del contenedor */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectors}
                outerRadius={110} // Aumenta el outerRadius para un gráfico más grande
                innerRadius={80}  // Ajusta el innerRadius proporcionalmente
                dataKey="total_recaudado"
                cx="50%"
                cy="50%"
                startAngle={360}
                endAngle={0}
                nameKey="sector_nombre"
                label={({ sector_nombre, total_recaudado, cx, cy, midAngle, innerRadius, outerRadius }) => {
                  const radius = outerRadius + 20;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-sm font-medium fill-gray-900"
                    >
                      $ {total_recaudado.toFixed(2)}
                    </text>
                  );
                }}
                labelLine={({ cx, cy, midAngle, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const startRadius = outerRadius;
                  const endRadius = outerRadius + 15;
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
                      stroke="#666"
                      strokeWidth={1.5}
                    />
                  );
                }}
              >
                {sectors.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 hover:opacity-80 hover:cursor-pointer"
                  />
                ))}
              </Pie>
              <Legend content={<CustomLegend sectors={sectors} theme={theme} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    );
}

