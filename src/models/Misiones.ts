// Imports
import mongoose, { Schema } from "mongoose";

export enum TipoMision {
    Habito,
    Tarea,
    Evento
}

export enum Dificultad {
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
        type: Number,
        enum: [0, 1, 2], // Habito=0, Tarea=1, Evento=2
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

const Mision = mongoose.model('Mision', misionSchema);

export default Mision;