import { Pool, types,BindConfig } from "pg";
import dotenv from 'dotenv';
import { parse } from "path";
dotenv.config();
types.setTypeParser(20, function(val) {
  return parseInt(val, 10)
})
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

types.setTypeParser(1700, function(val) {
  return parseFloat(val); // Mantiene el valor numérico
});


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