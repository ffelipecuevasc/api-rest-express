import { Router } from 'express';
import {
    crearVecino,
    obtenerVecinos,
    obtenerVecinoPorId,
    actualizarVecino,
    eliminarVecino
} from "../controllers/vecinoController.js";

const router = Router();

// END POINTS RESTful para el recurso asociado a "vecinos"
router.post('/', crearVecino);
router.get('/', obtenerVecinos);
router.get('/:id', obtenerVecinoPorId);
router.put('/:id', actualizarVecino);
router.delete('/:id', eliminarVecino);

export default router;