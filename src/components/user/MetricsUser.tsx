import {
  Card, CardBody, CardHeader, Divider, Progress,

} from "@nextui-org/react";
import React from "react";
import { IUserRepository } from "@/model/user-repository/UserRepository";
import { createApiUserRepository } from "@/services/serviceUser";
import clsx from "clsx";
export default async function MetricsUser() {

  const userRepository: IUserRepository = createApiUserRepository();
  const usersAllSector = await userRepository.getAllUserBySector();
  const usersInactivesActives = await userRepository.getUsersInactivesActives();
  const totalUsers = await userRepository.getAllUser();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card  >
        <CardHeader className="flex flex-col items-center justify-center" >
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              Cantidad de usuarios
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center mt-0 pb-6">
          <div className="transition duration-700 ease-in-out  hover:scale-110 bg-primary cursor-pointer rounded-xl border-2 shadow-md px-4 py-5 w-1/2 flex flex-col items-center justify-center">
            {" "}
            <h4 className="text-4xl font-bold">{totalUsers.success && totalUsers.data[0].total_usuarios}</h4>
            <p className="text-muted-fx`oreground">Total de usuarios</p>
          </div>
        </CardBody>
      </Card>
      <Card  >
        <CardHeader className="flex flex-col items-center justify-center " >
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              Activos e inactivos
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

            {usersInactivesActives.success &&
              usersInactivesActives.data.map((user, id) => {
                return (
                  <div key={id} className={clsx(
                    "transition duration-700 ease-in-out  hover:scale-110 rounded-xl cursor-pointer border-2 shadow-md px-4 py-5  flex flex-col items-center justify-center",
                    {
                      "bg-success-300": user.estado === true,  // Color para Mariscal Sucre
                      "bg-warning-300": user.estado === false,  // Color para otros sectores
                    }
                  )}>
                    <h4 className="text-4xl font-bold">{user.numero_usuarios}</h4>
                    <p className="text-muted-fx foreground text-center">{user.estado === true ? " Activos " : " Inactivos "}</p>
                  </div>

                )
              })
            }


          </div>

        </CardBody>
      </Card>
      <Card  >
        <CardHeader className="flex flex-col items-center justify-center" >
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              {" "}
              Usuarios por sector
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-cols items-center justify-center mt-0 pt-0 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

            {usersAllSector.success &&

              usersAllSector.data.map((user, id) => {
                return (
                  <div key={id} className={clsx(
                    "transition duration-700 ease-in-out  hover:scale-110 rounded-xl cursor-pointer border-2 shadow-md px-4 py-5  flex flex-col items-center justify-center",
                    {
                      "bg-primary-300": user.sector_nombre === "Mariscal Sucre",  // Color para Mariscal Sucre
                      "bg-default-50": user.sector_nombre !== "Mariscal Sucre"    // Color para otros sectores
                    }
                  )}>
                    <h4 className="text-4xl font-bold">{user.numero_usuarios}</h4>
                    <p className="text-muted-fx foreground text-center">{user.sector_nombre}</p>
                  </div>

                )
              })
            }


          </div>

        </CardBody>
      </Card>

    </div>
  );
}           