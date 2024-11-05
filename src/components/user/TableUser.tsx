"use server"
import CustomTable from "../table/CustomTable";
import React from "react";
import TooltipUser from "./TooltipUser";
import { columns } from "./ColumnsUser";
import { IUserRepository } from "@/model/user-repository/UserRepository";


export default async function TableUser({ repository, page, per_page, query }: { repository: IUserRepository, page: string, per_page: string, query: string }) {

  const users = per_page == '0'
    ? await repository.getListAllUser()
    : await repository.getUserPagination(Number(page), Number(per_page), query);

  const filtersConfig = [
    {
      columnItem: "sector_id",       // Filtrado para la columna "sector_id"
      columnsFilter: ["1", "2"],// Valores de filtrado para "sector_id"
      alias: ["Mariscal Sucre", "Nueva Ecuador"]
    }
  ];

  // if (isLoading) {
  //   return <SkeletonCustom />
  // }

  return (

    <div>

      {users.success &&
        <CustomTable
          columns={columns}
          data={users.data}
          per_page={Number(per_page)}
          filtersConfig={
            filtersConfig
          }
          
        >
          <TooltipUser></TooltipUser>
        </CustomTable>
      }
    </div>


  )
}