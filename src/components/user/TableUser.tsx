"use server"
import CustomTable from "../table/CustomTable";
import React from "react";
import TooltipUser from "./TooltipUser";
import { columns } from "./ColumnsUser";
import { IUserRepository } from "@/model/user-repository/UserRepository";


export default async function TableUser({ repository, page, per_page, query, sector, estado }:
  { repository: IUserRepository, page: string, per_page: string, query: string, sector: string, estado
    : string
   }) {

  const users = await repository.getUserPagination(Number(page), Number(per_page), query, sector, estado);


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


        >
          <TooltipUser></TooltipUser>
        </CustomTable>
      }
    </div>


  )
}