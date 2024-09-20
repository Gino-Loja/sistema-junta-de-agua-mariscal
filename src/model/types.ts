import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UsersBySector = {
  sector_nombre: string;
  numero_usuarios: number;
}

export type UsersInactivesActives = {
  estado: boolean;
  numero_usuarios: number;
}

export type TotalUser = {
  total_usuarios: number;
}

export type Sector = {
  id: number;
  nombre: string;
}


export type FormModalType = {
  table:
  | "user"
  | "student"
  | "parent"
  | "subject"
  | "class"
  type: "create" | "update"
  data: unknown;
  id?: number;
}

//type dataOrError<T> = { data: T } | { success: false, error: string };

export type QueryResultError<T> = { success: true, data: T } | { success: false, error: string };
