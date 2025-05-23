'use server'
import { User, UserDto } from '@/model/User'
import pool from './db'
import { QueryResultError, Sector, TotalUser, UsersBySector, UsersInactivesActives } from '@/model/types';
import { Dto } from '@/model/Dto';
import { revalidatePath } from 'next/cache';
//import exp from 'constants';

export async function getListAllUser(): Promise<QueryResultError<User[]>> {
    try {
        const user: User[] = (await pool.query('SELECT * FROM usuarios ORDER BY nombre ASC;')).rows;
        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
}

export async function getAllUserBySector(): Promise<QueryResultError<UsersBySector[]>> {
    try {
        const user: UsersBySector[] = (await pool.query(`select
        s.nombre as sector_nombre,
        count(u.id) as numero_usuarios
        from
        usuarios u
        join sectores s on u.sector_id = s.id
        group by
        s.nombre;
        `)).rows;

        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: `Error al obtener usuarios por sector: ${error}` };
    }
}

export async function getUsersInactivesActives(): Promise<QueryResultError<UsersInactivesActives[]>> {
    try {
        const user: UsersInactivesActives[] = (await pool.query(`select
        estado,
        count(*) as numero_usuarios
        from
        usuarios
        group by
        estado;
        `)).rows;

        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: `Error al obtener los usuarios inactivos y activos: ${error}` };
    }
}

export async function getAllUser(): Promise<QueryResultError<TotalUser[]>> {
    try {
        const user: TotalUser[] = (await pool.query(`select
        count(*) as total_usuarios
        from
        usuarios;
        `)).rows;

        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: `Error al obtener el total de usuarios: ${error}` };
    }
}

export async function getAllPagination(query: string, sector:string, estado:string): Promise<QueryResultError<TotalUser[]>> {
    try {
        const user: TotalUser[] = (await pool.query(`select
        count(*) as total_usuarios
        from
        usuarios
        WHERE
         -- Filtro por estado (si estado está vacío, no se filtra)
            ($3 = '' OR estado = CASE WHEN $3 = 'activo' THEN true ELSE false END)
            
            AND

            -- Filtro por sector (solo si $2 no está vacío)
           sector_id::text ILIKE '%' || $2 || '%'
            
            AND 
            
            -- Filtro por nombre o cédula (solo si $1 no está vacío)
            ( nombre ILIKE '%' || $1 || '%' OR cedula ILIKE '%' || $1 || '%')
        
         
        `,[query,sector, estado])).rows;

        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: `Error al obtener el total de usuarios: ${error}` };
    }
}


export async function getAllSector(): Promise<QueryResultError<Sector[]>> {
    try {
        const sector: Sector[] = (await pool.query(`select
    id,
     nombre
    from
    sectores`)).rows;
        return { success: true, data: sector };
    } catch (error) {
        return { success: false, error: `Error al obtener los sectores: ${error}` };
    }
}

export async function createUser(user: UserDto,): Promise<QueryResultError<User>> {
    try {
        const newUser: User = (await pool.query(`
            INSERT INTO usuarios (nombre, direccion, telefono, email, sector_id, estado, tipo, cedula)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;`, [
            user.nombre,
            user.direccion,
            user.telefono,
            user.email,
            user.sector_id,
            user.estado,
            user.tipo,
            user.cedula,
        ])).rows[0];
        revalidatePath('/users');
        return { success: true, data: newUser };
    } catch (error) {
        return { success: false, error: `Failed to create user: ${error}` };
    }


}

export async function updateUser(user: UserDto, id: number): Promise<QueryResultError<User>> {
    try {
        const newUser: User = (await pool.query(`UPDATE usuarios
            SET
                nombre = $1,
                direccion = $2,
                telefono = $3,
                email = $4,
                sector_id = $5,
                estado = $6,
                tipo = $7,
                cedula = $8
            WHERE id = $9
            RETURNING *;`, [
            user.nombre,
            user.direccion,
            user.telefono,
            user.email,
            user.sector_id,
            user.estado,
            user.tipo,
            user.cedula,
            id
        ])).rows[0];
        revalidatePath('/users');
        return { success: true, data: newUser };
    } catch (error) {
        return { success: false, error: `Failed to update user: ${error}` };
    }
}

export async function getUserPagination(currentPage: number, itemsPerPage: number, query: string, sector: string, estado: string): Promise<QueryResultError<User[]>> {

    //const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const offset = (currentPage - 1) * itemsPerPage;

    try {
        const user: User[] = (await pool.query(`
        SELECT *
        FROM usuarios
        WHERE 
            -- Filtro por estado (si estado está vacío, no se filtra)
            ($3 = '' OR estado = CASE WHEN $3 = 'activo' THEN true ELSE false END)
            
            AND

            -- Filtro por sector (solo si $2 no está vacío)
           sector_id::text ILIKE '%' || $2 || '%'
            
            AND 
            
            -- Filtro por nombre o cédula (solo si $1 no está vacío)
            ( nombre ILIKE '%' || $1 || '%' OR cedula ILIKE '%' || $1 || '%')
        
            
             
        ORDER BY nombre ASC 
        LIMIT ${itemsPerPage} OFFSET ${offset}
            
    `, [query, sector, estado])).rows;

        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: `Error al obtener todos los usuarios: ${error}` };
    }
}


export async function getUserLogin(username: string, password: string): Promise<{ id: string, name: string, email: string } | null> {
    try {
        const user: { id: string, name: string, email: string } = (await pool.query(`SELECT id::text, usuario as name, email FROM administradores WHERE usuario = $1 AND password_hash = $2`, [username, password])).rows[0];
        return user;
    } catch (error) {
        return null
    }
}

