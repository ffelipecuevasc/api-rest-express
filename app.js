import express from 'express';
import logger from 'morgan';

/* ----------------------------------------------
 * INICIO - Importación de Enrutadores
 * ---------------------------------------------- */
import indexRouter from './routes/index.js';
/* ----------------------------------------------
 * FIN - Importación de Enrutadores
 * ---------------------------------------------- */

/* ----------------------------------------------
 * Inicialización de la 'app' Express
 * ---------------------------------------------- */
const app = express();

/* ----------------------------------------------
 * INICIO - Configuración de Middlewares
 * ---------------------------------------------- */
app.use(logger('dev'));
// Habilitamos el middleware para el procesamiento de JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* ----------------------------------------------
 * FIN - Configuración de Middlewares
 * ---------------------------------------------- */

/* ----------------------------------------------
 * INICIO - Configuración de Rutas
 * ---------------------------------------------- */
app.use('/', indexRouter);
/* ----------------------------------------------
 * FIN - Configuración de Rutas
 * ---------------------------------------------- */

/* ----------------------------------------------
 * Exportación de la 'app' Express (Modules ES6+)
 * ---------------------------------------------- */
export default app;