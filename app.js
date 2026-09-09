import express from 'express';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import path from 'path';

/* ----------------------------------------------
 * INICIO - Importación de Enrutadores
 * ---------------------------------------------- */
import indexRouter from './routes/index.js';
import vecinosRouter from './routes/vecinos.js';
import cuotasRouter from './routes/cuotas.js';
import actasRouter from './routes/actas.js';
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
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 mg
    abortOnLimit: true,
    responseOnLimit: 'El archivo supera el límite de 5MB permitido.'
}));
app.use('/archivos', express.static(path.resolve('uploads')));
/* ----------------------------------------------
 * FIN - Configuración de Middlewares
 * ---------------------------------------------- */

/* ----------------------------------------------
 * INICIO - Configuración de Rutas
 * ---------------------------------------------- */
app.use('/', indexRouter);
app.use('/vecinos', vecinosRouter);
app.use('/cuotas', cuotasRouter);
app.use('/actas', actasRouter);
/* ----------------------------------------------
 * FIN - Configuración de Rutas
 * ---------------------------------------------- */

/* ----------------------------------------------
 * Exportación de la 'app' Express (Modules ES6+)
 * ---------------------------------------------- */
export default app;