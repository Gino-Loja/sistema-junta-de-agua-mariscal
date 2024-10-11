"use client"
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IUserRepository } from "@/model/user-repository/UserRepository";
import { createApiUserRepository } from "@/services/serviceUser";
import { User } from "@/model/User";

export default function Home() {
  const repositoryUser: IUserRepository = createApiUserRepository();
  const [userData, setUserData] = useState<User[]>([])

  return (


    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">

        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>

        <button className="transition duration-150 ease-in-out bg-red border-4">Button A</button>
        <button className="transition duration-300">Button B</button>
        <button className="transition duration-700 ease-in-out ...">Button C</button>
        <button className="transition duration-700 ease-in-out  bg-blue-500 hover:scale-110">
          Save Changes
        </button>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>

  );
}
