'use server'
import { User } from '@/model/User'
import pool from './db'
import { TotalUser, UsersBySector, UsersInactivesActives } from '@/model/types';

export async function getListAllUser(): Promise<User[]> {
    try {
        const user: User[] = (await pool.query('SELECT * FROM usuarios')).rows;
        return user;
    } catch (error) {
        throw new Error(`Failed to query users: ${error}`);
    }
}

export async function getAllUserBySector(): Promise<UsersBySector[]> {
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

        return user;
    } catch (error) {
        throw new Error(`Failed to query users: ${error}`);
    }
}

export async function getUsersInactivesActives(): Promise<UsersInactivesActives[]> {
    try {
        const user: UsersInactivesActives[] = (await pool.query(`select
        estado,
        count(*) as numero_usuarios
        from
        usuarios
        group by
        estado;
        `)).rows;

        return user;
    } catch (error) {
        throw new Error(`Failed to query users: ${error}`);
    }
}

export async function getAllUser(): Promise<TotalUser[]> {
    try {
        const user: TotalUser[] = (await pool.query(`select
        count(*) as total_usuarios
        from
        usuarios;
        `)).rows;

        return user;
    } catch (error) {
        throw new Error(`Failed to query users: ${error}`);
    }
}