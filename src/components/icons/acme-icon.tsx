import Image from "next/image";
import React from "react";

export const AcmeIcon = () => {
  return (

    <Image className="p-1 border rounded-full border-primary-500 shadow"  src="/icon.svg" alt="acme" width={50} height={50} />
   
  );
};
