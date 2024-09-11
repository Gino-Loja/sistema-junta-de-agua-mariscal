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
