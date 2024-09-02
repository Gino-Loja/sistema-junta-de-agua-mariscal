"use client"
import Image from "next/image";
import { NextUIProvider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IUserRepository } from "@/model/user-repository/UserRepository";
import { createApiUserRepository } from "@/services/serviceUser";
import { User } from "@/model/User";

export default function Home() {
  const repositoryUser: IUserRepository = createApiUserRepository();
  const [userData, setUserData] = useState<User[]>([])
  useEffect(() => {
    repositoryUser.getAllUser().then((users) => {
      setUserData(users);
    });

  }, []);



  

  


  return (
    <div className=" relative overflow-x-auto">
      {/* <Table aria-label="Example table with custom cells">
          <TableHeader >

            {table.getHeaderGroups().map(headerGroup => (

              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map(header => {

                  return (
                    <TableColumn key={header.id} colSpan={header.colSpan}>

                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </TableColumn>
                  )
                })}
              </TableRow>
            ))}

          </TableHeader>

          <TableBody>
            <TableRow>  
              <TableCell>Nombre</TableCell>
              <TableCell>Direccion</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Fecha de Creacion</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Cedula</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}

     
    </div>
  );
}
