
type Incident = {
  id: number;           // Identificador único del incidente
  usuario_id: number ;    // Relación con la tabla de usuarios
  nombre_usuario: string ; // Nombre del usuario que generó el incidente
  fecha: Date;          // Fecha del incidente
  costo: number;       // Costo asociado al incidente (opcional)
  sector_id: number;     // Relación con la tabla de sectores
  nombre_sector: string; // Nombre del sector al que pertenece el incidente
  foto: string;    // Foto almacenada en formato binario (opcional)
  descripcion: string; // Descripción del incidente (opcional)
};

type IncidentDto = Omit<Incident, "id" | "nombre_usuario"  | "nombre_sector"  >