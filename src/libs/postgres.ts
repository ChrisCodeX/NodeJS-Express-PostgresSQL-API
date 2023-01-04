import {Pool} from 'pg';
import {config} from '../config/config';

/* Conexión directa con la base de datos, manejando nosotros mismos un pool para las
conexiones */

let URI: string | undefined = '';

if (config.isProd) {
  URI = config.dbUrl
} else {
  const USER = encodeURIComponent(config.dbUser as string)
  const PASSWORD = encodeURIComponent(config.dbPassword as string)
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
}

export const pool = new Pool({
  connectionString: URI
})