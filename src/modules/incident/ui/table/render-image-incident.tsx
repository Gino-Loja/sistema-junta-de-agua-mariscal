'use client'

import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const RenderImageIncident = ({ id, width = 64, height = 64 }: { id: number | null, width?: number, height?: number }) => {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // console.log('ID:', id);
    useEffect(() => {
        const fetchImage = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const { data, error: storageError } = await supabase.storage
                    .from("incidentes")
                    .download(`${id}.jpeg`);

                if (storageError) {
                    throw storageError;
                }

                if (data) {
                    const url = URL.createObjectURL(data);
                    setAvatarUrl(url);
                }
            } catch (error) {
                setError('No se pudo cargar la imagen del incidente');
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [id, supabase]);



    if (loading) {
        return (
            <div className={`w-full rounded-lg`}>
                <Skeleton className="rounded-lg w-full">
                    <div className="w-full h-24 rounded-lg bg-default-300" />
                </Skeleton>
            </div>

        );
    }


    if (error) {
        return (
            <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-red-500 text-xs text-center">Error</span>
            </div>
        );
    }

    return (
        <div className="flex justify-end items-center gap-2">
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    objectFit="object-scale-down"
                    alt="Incidente"
                    className={`rounded-lg`}
                    width={width}
                    height={height}
                    priority
                />
            ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Sin imagen</span>
                </div>
            )}
        </div>
    );
};