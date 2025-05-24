'use client';
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface Style extends React.CSSProperties { }
interface DropzoneProps {
  type?: 'create' | 'update' | 'delete';
  incidentId?: number | null;
  onUploadSuccess?: () => void;
  onUploadError?: (error: string) => void;
}

interface PreviewFile extends FileWithPath {
  preview: string;
}
// Definición de tipos para los estilos
interface Style extends React.CSSProperties { }

// Estilos para el dropzone
const dropzoneStyle: Style = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  marginTop: "2rem",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border 0.24s ease-in-out",
  cursor: "pointer",
};

const activeDropzoneStyle: Style = {
  borderColor: "#00adb5",
};

const dropzoneTextStyle: Style = {
  margin: "0",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
};

const imagePreviewStyle: Style = {
  display: "flex",
  maxWidth: "100%",
  maxHeight: "100%",
  margin: "auto",
  borderRadius: "2px",
};

const fileNameStyle: Style = {
  display: "flex",
  fontSize: "14px",
  marginTop: "8px",
};

// Extiende FileWithPath para incluir la propiedad 'preview'
const DropzoneComponent: React.FC<DropzoneProps> = ({
  type = 'create',
  incidentId,
  onUploadSuccess,
  onUploadError
}) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const supabase = createClient();

  // Cargar imagen existente
  useEffect(() => {
    const loadExistingImage = async () => {
      if (type === 'update' && incidentId) {
        try {
          const { data, error } = await supabase.storage
            .from('incidentes')
            .download(`${incidentId}.jpeg`);

          if (data) {
            const url = URL.createObjectURL(data);
            setFiles([{
              name: `incidente-${incidentId}`,
              preview: url,
            } as PreviewFile]);
          }
        } catch (error) {
          onUploadError?.('Error cargando imagen existente');
        }
      }
    };
    loadExistingImage();
  }, [type, incidentId]);

  // Manejar subida/actualización de imagen
  const handleUpload = useCallback(async () => {
    if (!selectedFile || !incidentId) return;

    try {
      const fileName = `${incidentId}.jpeg`;

      const { error } = await supabase.storage
        .from('incidentes')
        .upload(fileName, selectedFile, {
          // cacheControl: '3600',
          upsert: true,
          contentType: 'image/jpeg'
        });

      if (error) throw error;
      onUploadSuccess?.();
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : 'Error actualizando imagen');
    }
  }, [selectedFile, incidentId]);

  useEffect(() => {
    if (selectedFile && type === 'update') {
      handleUpload();
    }
  }, [selectedFile, handleUpload, type]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (!acceptedFiles.length) return;

    const original = acceptedFiles[0];
    const newFileName = `incidente-${incidentId ?? 'nuevo'}.jpeg`;

    // 1. Clonamos con nuevo nombre
    const renamedFile = new File(
      [original],
      newFileName,
      { type: original.type }
    );

    // 2. Creamos preview URL
    const previewUrl = URL.createObjectURL(renamedFile);

    // 3. Guardamos en el estado
    setFiles([{
      ...renamedFile,
      preview: previewUrl,
    } as PreviewFile]);

    setSelectedFile(renamedFile);
  }, [incidentId]);


  // Limpiar URLs
  useEffect(() => {
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.preview));
    };
  }, [files]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 1024 * 2.5,
    maxFiles: 1,
  });

  return (
    <div
      style={isDragActive ? { ...dropzoneStyle, ...activeDropzoneStyle } : dropzoneStyle}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p style={dropzoneTextStyle}>
        {type === 'update'
          ? 'Arrastra una nueva imagen para actualizar'
          : 'Arrastra y suelta tu imagen aquí'}
      </p>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <Image
              style={imagePreviewStyle}
              src={file.preview}
              alt="Evidencia del incidente"
              width={300}
              height={300}
              onLoad={() => URL.revokeObjectURL(file.preview)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropzoneComponent;

