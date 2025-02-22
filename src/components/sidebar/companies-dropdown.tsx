"use client";

import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";

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

    <div className="w-full min-w-[260px] hover:bg-gray-50 transition-colors duration-200 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="relative group">
          {company.logo}
          <div className="absolute inset-0 bg-black/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-medium tracking-tight">
            {company.name}
          </h3>
          <span className="text-sm font-medium text-gray-500">
            {company.location}
          </span>
        </div>
      </div>
    </div>


  )
};
