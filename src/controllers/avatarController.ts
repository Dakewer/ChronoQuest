import {Types} from "mongoose";
import {Avatar} from "../dataBase/mongodb/avatarManager";

export const getAvatar = async (userId: string) => {
    return await Avatar.findOne({
        perteneceA: new Types.ObjectId(userId),
        activo: true
    });
};

// actualizar: Subir estadisticas
export const upAvatar = async (avatarId: string, updateData: any) => {
    return await Avatar.findByIdAndUpdate(
        avatarId, {
            $set: updateData
        }, {
            new: true
        } // Devolver ya actualizado
    );
};

// revisar que su tiempo de expiracion siga activo
export const checkAvatar = async (avatarId: string) => {
    const heroe = await Avatar.findById(avatarId);
    if (!heroe)
        return false;
    if (heroe.fechaFin < new Date()) {
        heroe.activo = false;
        await heroe.save();
        return false;
        // evoluvionar o matar al heroe
    }
    return heroe.activo;
};