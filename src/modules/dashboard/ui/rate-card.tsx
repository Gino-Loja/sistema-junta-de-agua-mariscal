"use client"

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Droplet, AlertTriangle, Ruler, BarChart2, TrendingUp, Ban } from 'lucide-react'

interface RateProps {
  id?: number
  valor_m3?: number
  valor_exceso?: number
  metros_base?: number
  metros_base_exceso?: number
  valor_exceso_superior?: number
  multa_sesiones?: number
}

// Adding default values in the component
export function RateCard({ rate  }: { rate: RateProps }) {
  const items = [
    {
      label: "Valor m³",
      value: "$"+ rate.valor_m3?.toFixed(2),
      icon: Droplet,
      description: "Tarifa base por metro cúbico",
      gradient: "bg-blue-500"
    },
    {
      label: "Valor exceso",
      value: "$"+rate.valor_exceso?.toFixed(2),
      icon: AlertTriangle,
      description: "Cargo adicional por exceso",
      gradient: "bg-warning-300"
    },
    {
      label: "Metros base",
      value: rate.metros_base + " m³",
      icon: Ruler,
      description: "Consumo base permitido",
      gradient: "bg-success-300"
    },
    {
      label: "Metros base exceso",
      value: rate.metros_base_exceso + " m³",
      icon: BarChart2,
      description: "Límite de exceso permitido",
      gradient: "bg-danger"
    },
    {
      label: "Valor exceso superior",
      value: "$"+rate.valor_exceso_superior?.toFixed(2),
      icon: TrendingUp,
      description: "Cargo por exceso superior",
      gradient: "bg-purple-500"
    },
    {
      label: "Multa sesiones",
      value: "$"+rate.multa_sesiones?.toFixed(2),
      icon: Ban,
      description: "Penalización por sesiones",
      gradient: "bg-default"
    },
  ]

  return (
    <Card radius='sm' shadow='none' className="col-span-full lg:col-span-2 ">
      <CardHeader className="pb-4">
        <h2 className="text-2xl font-bold text-center ">
          Información de Tarifas
        </h2>
      </CardHeader>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
          {items.map((item) => {
            let Icon = item.icon
            return (
              <div
                key={item.label}
                className="group relative p-4"
              >
                <div className={`absolute top-0 left-0 `}>
                  <Card className={`${item.gradient} `}>
                    <CardBody className="flex items-center justify-center bg-red">
                      <Icon className="w-6 h-6 " />
                    </CardBody>
                  </Card>
                  
                </div>
                <div className="mt-5 pl-2 border shadow rounded-md ">

                  <div className=' p-4'>
                    <h3 className="text-lg font-semibold mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm mb-3">
                      {item.description}
                    </p>
                    <p className={`text-3xl font-bold bg-gradient-to-r  bg-clip-text `}>
                      {item.value}
                    </p>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
