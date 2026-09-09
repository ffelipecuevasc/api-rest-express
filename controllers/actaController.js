import path from 'path';
import fs from 'fs/promises';
import Acta from '../models/Acta.js';

export const subirActa = async (req, res) => {
    try {

        if(!req.files || Object.keys(req.files).length === 0 || !req.files.documento){
            return res.status(400).json({
                error: 'No se subió ningún archivo. El nombre del atributo (key) debe llamarse "documento".'
            });
        }

        const documento = req.files.documento;

        const extensionesPermitidas = ['pdf', 'docx', 'doc'];
        const extension = path.extname(documento.name).toLowerCase();

        if(!extensionesPermitidas.includes(extension)){
            return res.status(400).json({
                error: 'Extensión no válida. Sólo se permiten .pdf, .docx y .doc.'
            });
        }

        const nombreFinal = `acta_${Date.now()}${extension}`;

        const rutaDestino = path.resolve(`uploads/actas/${nombreFinal}`);
        await documento.mv(rutaDestino);

        const nuevoActa = await Acta.create({
            titulo: req.body.titulo,
            resumen: req.body.resumen,
            archivo_url: `/archivos/actas/${nombreFinal}`,
            fecha_asamblea: req.body.fecha_asamblea,
            subido_por: req.body.subido_por,
        });

        res.status(201).json({
            message: 'Acta subida exitosamente.',
            data: nuevoActa
        });
    } catch (error) {
        res.status(500).json({ error: 'Error interno al subir el documento.' });
    }
};

export const eliminarActa = async (req, res) => {
    try {
        const { id } = req.params;
        const acta = await Acta.findByPk(id);

        if(!acta){
            return res.status(404).json({ error: 'Acta no encontrada en la BD.' });
        }

        const nombreArchivo = path.resolve(acta.archivo_url);
        const rutaFisica = path.resolve(`uploads/actas/${nombreArchivo}`);

        try {
            await fs.access(rutaFisica);
            await fs.unlink(rutaFisica);
        } catch (fileError) {
            console.warn(`El archivo '${nombreArchivo}' no existía en el disco, se borrará el registro en la BD.`);
        }

        await Acta.destroy();

        res.status(204).end();

    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el documento.' });
    }
};