import express from 'express';
import { routerApi } from './routes';
import { logErrors, errorHandler, boomErrorHandler } from './middleware/error.handler';
import cors from 'cors';

const app = express();

const port = 3000;

/* Middleware que permite recibir las peticiones en formato json */
app.use(express.json());

/* Configurar el acceso a la API desde cualquier dominio */
//app.use(cors());

/* Configurar el acceso a dominios personalizados */
const whitelist = ['http://localhost:8080', 'http://localhost:5500', 'https://myapp.co']
const options = {
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Acceso no permitido'))
    }
  }
}
app.use(cors(options))

/* Routes assigned to application instance */
routerApi(app);

/* Error middlewares - Van al final
Otros middlewares van delante
*/

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

/* Listen message */
console.log('listening on port:', port);
app.listen(port);
