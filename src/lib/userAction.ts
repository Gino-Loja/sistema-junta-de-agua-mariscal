'use server'
import { User } from '@/model/User'
import pool from './db'

export async function getAllUser(): Promise<User[]> {
    try {
        const user: User[] = (await pool.query('SELECT * FROM usuarios limit 10')).rows;
        return user;
    } catch (error) {
        throw new Error(`Failed to query users: ${error}`);
    }
}
