import Cuota from '../models/Cuota.js';
import Vecino from '../models/Vecino.js';

// 🟢 POST /cuotas - Registrar una nueva cuota para un vecino
export const crearCuota = async (req, res) => {
    try {
        const nuevaCuota = await Cuota.create(req.body);
        res.status(201).json({
            message: 'Cuota registrada exitosamente',
            data: nuevaCuota
        });
    } catch (error) {
        console.error('Error al crear cuota:', error);
        res.status(400).json({ error: 'Fallo al registrar la cuota. Verifica los datos y el ID del vecino.' });
    }
};

// 🔵 GET /cuotas - Listar todas las cuotas con filtros
export const obtenerCuotas = async (req, res) => {
    try {
        // Extraemos posibles filtros por Query Params (ej. /cuotas?estado_pago=pendiente&vecino_id=1)
        const { estado_pago, vecino_id } = req.query;

        const queryOptions = {
            where: {},
            // Hacemos JOIN con Vecino para saber a quién pertenece la cuota, excluyendo datos sensibles
            include: [{
                model: Vecino,
                attributes: ['rut', 'nombre_completo', 'email']
            }]
        };

        // Construcción dinámica de filtros
        if (estado_pago) queryOptions.where.estado_pago = estado_pago;
        if (vecino_id) queryOptions.where.vecino_id = vecino_id;

        const cuotas = await Cuota.findAll(queryOptions);
        res.status(200).json({ data: cuotas });
    } catch (error) {
        console.error('Error al obtener cuotas:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener cuotas' });
    }
};

// 🔵 GET /cuotas/:id - Obtener el detalle de una cuota específica
export const obtenerCuotaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cuota = await Cuota.findByPk(id, {
            include: [{
                model: Vecino,
                attributes: ['rut', 'nombre_completo', 'email']
            }]
        });

        if (!cuota) {
            return res.status(404).json({ error: 'Cuota no encontrada' });
        }

        res.status(200).json({ data: cuota });
    } catch (error) {
        console.error('Error al buscar cuota:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// 🟠 PUT /cuotas/:id - Actualizar datos de una cuota (ej. marcar como 'pagado')
export const actualizarCuota = async (req, res) => {
    try {
        const { id } = req.params;

        const [filasActualizadas] = await Cuota.update(req.body, {
            where: { id }
        });

        if (filasActualizadas === 0) {
            return res.status(404).json({ error: 'Cuota no encontrada o sin cambios detectados' });
        }

        res.status(200).json({ message: 'Cuota actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar cuota:', error);
        res.status(400).json({ error: 'Error al actualizar la cuota' });
    }
};

// 🔴 DELETE /cuotas/:id - Eliminar un registro de cuota erróneo
export const eliminarCuota = async (req, res) => {
    try {
        const { id } = req.params;

        const filasBorradas = await Cuota.destroy({
            where: { id }
        });

        if (filasBorradas === 0) {
            return res.status(404).json({ error: 'Cuota no encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar cuota:', error);
        res.status(500).json({ error: 'Error al ejecutar la eliminación de la cuota' });
    }
};