import mongoose, { Schema, Types } from "mongoose";

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
        fuerza: statSchema,
        velocidad: statSchema,
        suerte: statSchema,
        defensa: statSchema,
        vida: statSchema
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

const Avatar = mongoose.model('Avatar', avatarSchema);

export default Avatar;
