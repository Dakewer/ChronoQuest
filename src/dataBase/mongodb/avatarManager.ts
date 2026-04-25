import mongoose, { Schema, Types } from "mongoose";
import { features } from "process";
import { deserialize } from "v8";

export enum ClaseAvatar {
    Aprendiz = 1,
    Mago = 1001,
    Espadachin = 1002,
    Nigromante = 1003
}

// Estructura para los 3 tipos de estadisticas
const statSchema = {
    // por clase
    base: {
        type: Number,
        default: 0
    },
     // por misiones
    entrenada: {
        type: Number,
        default: 0
    },
    // por otro pj
    heredada: {
        type: Number,
        default: 0
    }
};

const avatarSchema = new Schema({
    name: {
        type: String,
        required: true
    }, // Nombre del bicho,separado del del usuario
    activo: {
        type: Boolean,
        default: true
    },
    tipo: {
        type: Number,
        enum: [1, 1001, 1002, 1003],
        required: true
    },
    creacion: {
        type: Date,
        default: Date.now
    },
    fechaFin: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },

    stats: {
        vida: statSchema,
        fuerza: statSchema,
        destreza: statSchema,
        constitucion: statSchema,
    },

    // Límites de entrenamiento RPG
    entrenamientop: {
        type: Number,
        default: 0
    },
    maxEntrenamiento: {
        type: Number,
        default: 100
    },

    perteneceA: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

export const Avatar = mongoose.model("Avatar", avatarSchema);

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