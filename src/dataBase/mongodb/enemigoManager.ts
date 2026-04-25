import mongoose, { Schema, Types } from "mongoose";
import { features } from "process";
import { deserialize } from "v8";

export enum ClaseEnemigo {
    Chompsky = 0,
    Goblin = 1,
    Orco = 2,
    Troll = 3,
    Dragón = 4
}

const statSChema = {
    base: {
        type: Number,
        default: 0
    },
    entrenada: {
        type: Number,
        default: 0
    },
    heredada: {
        type: Number,
        default: 0
    }
}; 

const enemigoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tipo: {
        type: Number,
        enum: [1, 1001, 1002, 1003],
        required: true
    },
    stats: {
        vida: statSChema,
        fuerza: statSChema,
        destreza: statSChema,
        constitucion: statSChema,
    }
});

export const Enemigos = mongoose.model("Enemigos", enemigoSchema);

export const getEnemigos = async (enemigoId: string) => {
    return await Enemigos.findById(enemigoId);
};