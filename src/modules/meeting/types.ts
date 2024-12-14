export type Meeting = {
    id: number;
    nombre_usuario: string;
    usuario_id: number;
    fecha: Date;
    motivo: string;
    estado: string;
    fecha_actualizacion: Date;
};

export type StatusAllMeeting = {
    estado: string;
    total: number;
};

export type CounterMeeting = {
    total: number;
};