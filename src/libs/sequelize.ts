import {Sequelize} from 'sequelize';
import { config } from '../config/config';
import { setupModels } from '../database/models';

/* Configuración para usar Sequelize ORM */
// const USER = encodeURIComponent(config.dbUser as string)
// const PASSWORD = encodeURIComponent(config.dbPassword as string)
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

// Get database URL from an environment variable
let dbUrlValidation = ''

if (config.dbUrl) {
  dbUrlValidation = config.dbUrl
}

// Opciones para el entorno de desarrollo o producción
type opt = {
  dialect: string,
  loggin: boolean,
  dialectOptions?: Object
}
let options: opt = {
  dialect: 'postgres',
  loggin: !config.isProd
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

export const sequelize = new Sequelize(dbUrlValidation, {
  dialect: 'postgres',
  logging: console.log
})

// Configuración de los modelos para las tablas de la base de datos
setupModels(sequelize);

// Creación de las tablas a través de la sincronización (No recomendable)
// sequelize.sync();
