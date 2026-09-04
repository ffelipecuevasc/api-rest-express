import { Router } from 'express';
import { obtenerCuotas } from "../controllers/cuotaController.js";

const router = Router();

// Único END POINT = /cuotas/
router.get('/', obtenerCuotas);

export default router;