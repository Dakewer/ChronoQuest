import mongoose, { Schema, Types } from "mongoose";

// Enums para mantener consistencia
enum TipoMision {
    Habito,
    Tarea,
    Evento
}
enum Dificultad {
    muyFacil,
    Facil,
    medio,
    dificil,
    muyDificil,
    ThisIsDarkSouls
}

const misionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tipo: {
        type: TipoMision,
        required: true
    },
    descripcion: {
        type: String
    },
    asignadaA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    statASubir: {
        type: String,
        required: true
    },
    puntosExp: {
        type: Number,
        default: 10
    },

    racha: {
        type: Number,
        default: 0
    },
    activa: {
        type: Boolean,
        default: true
    },
    fechaFin: {
        type: Date
    }
});