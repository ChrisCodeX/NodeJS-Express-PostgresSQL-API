import {Sequelize} from 'sequelize';
import { config } from '../config/config';

/* Configuración para usar Sequelize ORM */
const USER = encodeURIComponent(config.dbUser as string)
const PASSWORD = encodeURIComponent(config.dbPassword as string)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

export const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log
})