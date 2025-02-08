"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { BottomIcon } from "../icons/sidebar/bottom-icon";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "JAAP",
    location: "Mariscal Sucre",
    logo: <AcmeIcon />,
  });
  return (

    <div className="w-full min-w-[260px]">
      <div className="flex items-center gap-2">
        {company.logo}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
            {company.name}
          </h3>
          <span className="text-xs font-medium text-default-500">
            {company.location}
          </span>
        </div>
      </div>
    </div>


  //   <Dropdown
  //     classNames={{
  //       base: "w-full min-w-[260px]",
  //     }}
  //   >
  //     <DropdownTrigger className="cursor-pointer">
  //       <div className="flex items-center gap-2">
  //         {company.logo}
  //         <div className="flex flex-col gap-4">
  //           <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
  //             {company.name}
  //           </h3>
  //           <span className="text-xs font-medium text-default-500">
  //             {company.location}
  //           </span>
  //         </div>
  //         <BottomIcon />
  //       </div>
  //     </DropdownTrigger>
  //     <DropdownMenu
  //       onAction={(e) => {
  //         if (e === "1") {
  //           setCompany({
  //             name: "Facebook",
  //             location: "San Fransico, CA",
  //             logo: <AcmeIcon />,
  //           });
  //         }

  //       }}
  //       aria-label="Avatar Actions"
  //     >
  //       <DropdownSection title="">

  //         <DropdownItem
  //           key="4"
  //           startContent={<AcmeIcon />}
  //           description="Junta Administradora de Agua Potable Mariscal Sucre"
  //           classNames={{
  //             base: "py-4",
  //             title: "text-base font-semibold",
  //           }}
  //         >
  //           JAPP          </DropdownItem>
  //       </DropdownSection>
  //     </DropdownMenu>
  //   </Dropdown>
  // );
  )
};
