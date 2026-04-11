// Imports
import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Avatar from '../models/Avatar';

// Obtener avatar activo de un usuario
export const getAvatar = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const avatar = await Avatar.findOne({
            perteneceA: new Types.ObjectId(userId),
            activo: true
        });

        if (!avatar) {
            return res.status(404).json({ message: 'Avatar no encontrado o inactivo' });
        }

        res.status(200).json(avatar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar estadísticas del avatar
export const updateAvatar = async (req: Request, res: Response) => {
    try {
        const { avatarId } = req.params;
        const updateData = req.body;

        const avatar = await Avatar.findByIdAndUpdate(
            avatarId,
            { $set: updateData },
            { new: true }
        );

        if (!avatar) {
            return res.status(404).json({ message: 'Avatar no encontrado' });
        }

        res.status(200).json(avatar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verificar estado del avatar (expiración)
export const checkAvatarStatus = async (req: Request, res: Response) => {
    try {
        const { avatarId } = req.params;
        const heroe = await Avatar.findById(avatarId);

        if (!heroe) {
            return res.status(404).json({ message: 'Avatar no encontrado' });
        }

        let isActive = heroe.activo;

        if (heroe.fechaFin < new Date()) {
            heroe.activo = false;
            await heroe.save();
            isActive = false;
        }

        res.status(200).json({
            active: isActive,
            message: isActive ? 'Avatar activo' : 'Avatar expirado o inactivo'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear nuevo avatar
export const createAvatar = async (req: Request, res: Response) => {
    try {
        const avatarData = req.body;
        const newAvatar = new Avatar(avatarData);
        await newAvatar.save();

        res.status(201).json(newAvatar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar avatar (soft delete)
export const deleteAvatar = async (req: Request, res: Response) => {
    try {
        const { avatarId } = req.params;
        const avatar = await Avatar.findByIdAndUpdate(
            avatarId,
            { activo: false },
            { new: true }
        );

        if (!avatar) {
            return res.status(404).json({ message: 'Avatar no encontrado' });
        }

        res.status(200).json({ message: 'Avatar desactivado correctamente', avatar });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};