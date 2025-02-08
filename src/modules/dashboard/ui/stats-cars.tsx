'use client'

import { Card, CardBody } from "@nextui-org/react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  children?: React.ReactNode;
  description?: string;
}

export function StatsCard({ title, value, children, description }: StatsCardProps) {
  return (
    <Card shadow="none" radius="sm" className="border shadow overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ">
      <CardBody className="p-6">
        <div className="flex items-center space-x-4">
          {children}
          <div className="flex-1">
            <p className="text-sm font-medium ">{title}</p>
            <h3 className="text-2xl font-bold mt-1 ">{value}</h3>
            {description && (
              <p className="text-sm  mt-1">{description}</p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}