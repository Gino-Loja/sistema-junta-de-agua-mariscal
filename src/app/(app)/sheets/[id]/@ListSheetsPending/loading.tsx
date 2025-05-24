import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="h-full z-auto bg-white/30 backdrop-blur-md flex items-center justify-center rounded-xl">
            <Spinner color="primary" size="lg" label="Cargando datos..." />
        </div>
    );
}
