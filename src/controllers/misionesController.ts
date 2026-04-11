// Imports
import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Mision from '../models/Misiones';

// Mostrar misiones del usuario
export const getMisiones = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'El userId es requerido'
            });
        }

        const misiones = await Mision.find({
            asignadaA: new Types.ObjectId(userId),
            activa: true
        });

        res.status(200).json({
            success: true,
            data: misiones
        });

    } catch (error) {
        console.error('Error en getMisiones:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las misiones',
            error: error.message
        });
    }
};

// Mostrar misiones del usuario por tags
export const getMisionesByTags = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { tags } = req.body;

        if (!userId || !tags || !Array.isArray(tags)) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere userId y un array de tags'
            });
        }

        const misiones = await Mision.find({
            asignadaA: new Types.ObjectId(userId),
            activa: true,
            tags: { $in: tags }
        });

        res.status(200).json({
            success: true,
            data: misiones
        });

    } catch (error) {
        console.error('Error en getMisionesByTags:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las misiones por tags',
            error: error.message
        });
    }
};

// Mostrar una misión específica
export const getMisionById = async (req: Request, res: Response) => {
    try {
        const { userId, misionId } = req.params;

        if (!userId || !misionId) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere userId y misionId'
            });
        }

        const mision = await Mision.findOne({
            _id: new Types.ObjectId(misionId),
            asignadaA: new Types.ObjectId(userId)
        });

        if (!mision) {
            return res.status(404).json({
                success: false,
                message: 'Misión no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: mision
        });

    } catch (error) {
        console.error('Error en getMisionById:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la misión',
            error: error.message
        });
    }
};

// Eliminar misión
export const deleteMision = async (req: Request, res: Response) => {
    try {
        const { misionId } = req.params;

        if (!misionId) {
            return res.status(400).json({
                success: false,
                message: 'El misionId es requerido'
            });
        }

        const mision = await Mision.findByIdAndDelete(misionId);

        if (!mision) {
            return res.status(404).json({
                success: false,
                message: 'Misión no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Misión eliminada correctamente',
            data: mision
        });

    } catch (error) {
        console.error('Error en deleteMision:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la misión',
            error: error.message
        });
    }
};

// Crear o actualizar misión
export const upsertMision = async (req: Request, res: Response) => {
    try {
        const misionData = req.body;

        // Validar datos requeridos
        if (!misionData.name || !misionData.tipo === undefined || !misionData.asignadaA || !misionData.statASubir) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos: name, tipo, asignadaA, statASubir'
            });
        }

        // Si la misión ya existe, verificamos si cambiaron stats
        if (misionData._id) {
            const anterior = await Mision.findById(misionData._id);
            if (anterior) {
                // Si cambia lo que entrena, reiniciamos racha
                if (anterior.statASubir !== misionData.statASubir) {
                    misionData.racha = 0;
                }
            }
        }

        // Si no hay _id, crear uno nuevo
        if (!misionData._id) {
            misionData._id = new Types.ObjectId();
        }

        const mision = await Mision.findOneAndUpdate(
            { _id: misionData._id },
            misionData,
            { upsert: true, new: true }
        );

        res.status(200).json({
            success: true,
            message: misionData._id ? 'Misión actualizada' : 'Misión creada',
            data: mision
        });

    } catch (error) {
        console.error('Error en upsertMision:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear/actualizar la misión',
            error: error.message
        });
    }
};