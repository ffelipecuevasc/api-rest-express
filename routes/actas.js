import { Router } from 'express';
import {
    subirActa,
    eliminarActa
} from '../controllers/actaController.js';

const router = Router();

router.post('/', subirActa);
router.delete('/:id', eliminarActa);

export default router;