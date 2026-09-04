import { Router } from 'express';

const router = Router();

/* ----------------------------------------------
 * GET / - Prueba Inicial de la API
 * ---------------------------------------------- */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API REST Junta de Vecinos funcionando correctamente'
  });
});

export default router;