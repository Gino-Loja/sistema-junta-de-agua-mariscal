export type User = {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string; // Opcional porque puede ser null
    email: string; // Opcional porque puede ser null
    sector_id: number; // Opcional porque puede ser null
    fecha_creacion: string;
    estado: boolean;
    tipo: string;
    cedula: string;
}

export type UserDto = Omit<User, "id" | "fecha_creacion">

