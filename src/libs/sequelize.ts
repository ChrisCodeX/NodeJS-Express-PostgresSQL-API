import {Sequelize} from 'sequelize';
import { config } from '../config/config';
import { setupModels } from '../database/models';

/* Configuración para usar Sequelize ORM */
const USER = encodeURIComponent(config.dbUser as string)
const PASSWORD = encodeURIComponent(config.dbPassword as string)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

export const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log
})

// Configuración de los modelos para las tablas de la base de datos
setupModels(sequelize);

// Creación de las tablas a través de la sincronización
// sequelize.sync();
