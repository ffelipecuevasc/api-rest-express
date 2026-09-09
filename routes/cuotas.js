import { Router } from 'express';
import {
    crearCuota,
    obtenerCuotas,
    obtenerCuotaPorId,
    actualizarCuota,
    eliminarCuota
} from '../controllers/cuotaController.js';

const router = Router();

// Endpoints RESTful para el recurso "cuotas"
router.post('/', crearCuota);
router.get('/', obtenerCuotas);
router.get('/:id', obtenerCuotaPorId);
router.put('/:id', actualizarCuota);
router.delete('/:id', eliminarCuota);

export default router;