import Vecino from "../models/Vecino.js";
import Cuota from "../models/Cuota.js";
import sequelize from "../config/database.js";

// 🟢 POST /vecinos - Registrar un nuevo vecino
export const crearVecino = async (req, res) => {
    try {
        const nuevoVecino = await Vecino.create(req.body);
        const { password_hash, ...vecinoData } = nuevoVecino.toJSON();

        res.status(201).json({
            message: `Vecino registrado exitosamente.`,
            data: vecinoData
        });
    } catch (error) {
        console.log('Error al crear un vecino: ', error);
        res.status(400).json({
            error: 'Fallo al crear un vecino. Verifica los datos enviados.'
        });
    }
};

// 🔵 GET /vecinos - Listar todos los vecinos con filtros
export const obtenerVecinos = async (req, res) => {
    try {
        const { rol } = req.query;

        const queryOptions = {
            attributes: { exclude: ["password_hash"] },
            include: [{ model: Cuota, attributes: ['id', 'monto', 'estado_pago'] }],
        };

        if (rol) {
            queryOptions.where = { rol };
        }

        const vecinos = await Vecino.findAll(queryOptions);
        res.status(200).json({ data: vecinos });
    } catch (error) {
        console.log('Error al obtener los vecinos: ', error);
        res.status(400).json({
            error: 'Fallo al obtener los vecinos. Verifica los datos consultados.'
        });
    }
};

// 🔵 GET /vecinos/:id - Obtener el detalle de un vecino específico
export const obtenerVecinoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const vecino = await Vecino.findByPk(id, {
            attributes: {
                exclude: ["password_hash"]
            }
        });

        if (!vecino) {
            return res.status(404).json({
                error: 'Vecino no encontrado'
            });
        }

        res.status(200).json({ data: vecino });
    } catch (error) {
        console.log('Error al buscar un vecino por ID: ', error);
        res.status(400).json({
            error: 'Fallo al buscar un vecino, no existe uno con ese ID. Verifica los datos enviados.'
        });
    }
};

// 🟠 PUT /vecinos/:id - Actualizar datos de un vecino
export const actualizarVecino = async (req, res) => {
    try {
        const { id } = req.params;
        /*
        VALIDACIÓN PREVIA A LA ACTUALIZACIÓN

        1) Ejecutar un SELECT a la BD = findByPk();
        2) Recibir eso en un objeto 'vecino'
        3) Validar que el objeto 'vecino' no venga nulo
        }*/
        const [filasActualizadas] = await Vecino.update(req.body, {
            where: { id }
        });

        if (filasActualizadas === 0) {
            return res.status(404).json({
                error: 'Vecino no encontrado o sin cambios detectados.'
            });
        }
        res.status(200).json({ message: 'Datos del vecino actualizados correctamente.'});
    } catch (error) {
        console.log('Error al actualizar un vecino: ', error);
        res.status(400).json({
            error: 'Fallo al actualizar un vecino. Verifica los datos enviados.'
        });
    }
};

// 🔴 DELETE /vecinos/:id - Eliminar un vecino
export const eliminarVecino = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await eliminarVecinoConTransaccion(id);

        if (!eliminado) {
            return res.status(404).json({
                error: 'Vecino no encontrado'
            });
        }

        res.status(204).end();
    } catch (error) {
        console.log('Error al eliminar un vecino: ', error);
        res.status(400).json({
            error: 'Fallo al eliminar en cascada las cuotas + vecino. Verifica los datos enviados'
        });
    }
};

// Función auxiliar separada de los métodos CRUD
const eliminarVecinoConTransaccion = async (vecinoId) => {
    return await sequelize.transaction(async (t) => {
        const vecino = await Vecino.findByPk(vecinoId, {transaction: t});

        if(!vecino) {
            return false;
        }

        await Cuota.destroy({
            where: { vecino_id: vecinoId },
            transaction: t
        });

        await Vecino.destroy({
            where: { id: vecinoId },
            transaction: t
        });

        return true;
    });
};