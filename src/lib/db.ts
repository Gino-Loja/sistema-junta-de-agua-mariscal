import { Pool, types } from "pg";
import dotenv from 'dotenv';
dotenv.config();
types.setTypeParser(20, function(val) {
  return parseInt(val, 10)
})
let pool;
if (!pool) {
  pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT as unknown as number,
  });
}

export default pool as Pool