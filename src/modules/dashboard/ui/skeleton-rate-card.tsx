'use client'

import { Card, CardBody, Skeleton } from "@nextui-org/react"

export default function SkeletonRateCard() {
  return (
    <div className="group relative p-4">
      <div className="absolute top-0 left-0">
        <Card>
          <CardBody className="flex items-center justify-center w-12 h-12">
            <Skeleton className="w-6 h-6 rounded" />
          </CardBody>
        </Card>
      </div>
      <div className="mt-5 pl-2 border shadow rounded-md">
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 rounded-lg mb-1" /> {/* Placeholder for label */}
          <Skeleton className="h-4 w-full rounded-lg mb-3" /> {/* Placeholder for description */}
          <Skeleton className="h-8 w-1/2 rounded-lg" /> {/* Placeholder for value */}
        </div>
      </div>
    </div>
  )
}

