import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import Image from 'next/image';

interface ImagePreviewProps {
  imageData: string | null;
}

const ImagePreview = ({ imageData }: ImagePreviewProps) => {
  if (!imageData) return null;

  // Verificar si el formato de la cadena base64 es correcto
  const formattedImageData = imageData.startsWith('data:image/png;base64,')
    ? imageData
    : `data:image/png;base64,${imageData}`;

  return (

    <Image
      src={formattedImageData}
      alt="Vista previa"
      className="max-w-full h-auto rounded-lg mx-auto m-3"
      width={300}
      height={300}
    />

  );
};

export default ImagePreview;