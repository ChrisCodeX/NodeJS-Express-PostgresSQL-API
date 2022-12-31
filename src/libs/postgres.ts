import {Pool} from 'pg';
import {config} from '../config/config';

/* Conexión directa con la base de datos, manejando nosotros mismos un pool para las
conexiones */

const USER = encodeURIComponent(config.dbUser as string)
const PASSWORD = encodeURIComponent(config.dbPassword as string)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

export const pool = new Pool({
  connectionString: URI
})