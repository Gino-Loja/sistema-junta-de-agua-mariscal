'use client'

import { Card, CardBody, Skeleton } from "@nextui-org/react"

export default function SkeletonStatsCard() {
  return (
    <Card 
      shadow="none" 
      radius="sm" 
      className="border shadow overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <CardBody className="p-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="rounded-full w-12 h-12" /> {/* Placeholder for icon or avatar */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-3/4 rounded-lg" /> {/* Placeholder for title */}
            <Skeleton className="h-6 w-1/2 rounded-lg" /> {/* Placeholder for value */}
            <Skeleton className="h-3 w-5/6 rounded-lg" /> {/* Placeholder for description */}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

