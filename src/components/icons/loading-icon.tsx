
'use client'
import React from "react";

export default function LoadingIcon() {
  return (
    <div className="flex justify-center items-center w-full h-full [&_svg]:text-primary-500 [&_svg_path]:!fill-[none]">
      <svg
        className="w-full h-7"
        version="1.1"
        id="L4"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 40 60 16"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
      >
        <circle
          fill="currentColor"
          stroke="none"
          cx="6"
          cy="50"
          r="6"
        >
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle
          fill="currentColor"
          stroke="none"
          cx="26"
          cy="50"
          r="6"
        >
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        
        <circle
          fill="currentColor"
          stroke="none"
          cx="46"
          cy="50"
          r="6"
        >
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
        
      </svg>
    </div>
  );
}