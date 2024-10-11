"use client"

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton
} from "@nextui-org/react";

export default function MetricSkeleton() {
  return (
    <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Revenue Card */}
      <Card className="border">
        <CardHeader className="grid grid-cols-1 gap-2 p-6">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="w-full px-4 py-5">
            <Skeleton className="h-4 w-1/2 rounded-lg mb-2" />
            <Skeleton className="h-6 w-full rounded-lg mb-2" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
          </div>
        </CardBody>
      </Card>

      {/* Sectors Card */}
      <Card className="border">
        <CardHeader className="grid grid-cols-1 gap-2 p-6">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 overflow-hidden">
          <div className="min-w-72 min-h-36 flex flex-col items-center justify-center">
            <Skeleton className="h-36 w-36 rounded-full" />
          </div>
        </CardBody>
      </Card>

      {/* Paid Bills Card */}
      <Card className="border">
        <CardHeader className="grid grid-cols-1 gap-2 p-6">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="flex flex-col items-center justify-center">
            <Skeleton className="h-12 w-24 rounded-lg mb-2" />
            <Skeleton className="h-4 w-32 rounded-lg" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}