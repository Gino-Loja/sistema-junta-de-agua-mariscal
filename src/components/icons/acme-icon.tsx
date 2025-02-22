import Image from "next/image";
import React from "react";

export const AcmeIcon = () => {
  return (
    <div className="relative w-[52px] h-[52px] transform transition-transform duration-200 hover:scale-105">
      <Image
        width={30}
        height={30}
        className="w-full h-full rounded-full object-cover border-2 border-gray-200/50 shadow-sm hover:border-gray-300/80 transition-colors duration-200"
        src="/icon.svg"
        alt="JAAP Logo"
        loading="lazy"
      />
    </div>   
  );
};
