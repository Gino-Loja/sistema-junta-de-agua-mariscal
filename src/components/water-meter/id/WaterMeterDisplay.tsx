'use client'

import { Card } from "@nextui-org/react";

export default function WaterMeterDisplay({ data, title, subtitle, size = 'h-48' }: { data: { value: number }, title: string, subtitle: string, size?: string }) {
    return (
        <Card className={`p-4 ${size}`}>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div>
                <div  className="space-y-3">
                    {/* //<h2 className="text-lg font-semibold">{data.value}</h2> */}
                    <h4 className={`text-4xl lg:text-6xl font-bold `}>{data.value} m</h4>
                    <p className="text-muted-foreground">{subtitle}</p>
                </div>
            </div>
        </Card>
    )
}