"use strict";

import mongoose from "mongoose";
const enemy = "enemy";

const enemySchema = new mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    hp : {
        type: Number,
        required: true
    },
    attack : {
        type: Number,
        required: true
    }
});

const enemigo = mongoose.model("Enemy", enemySchema);
export default enemigo;

//los Croods
export const createEnemy = async (data: any) => {
    return await enemigo.create(data);
};

export const getEnemy = async (id: string) => {
    return await enemigo.findById(id);
};

export const getAllEnemies = async () => {
    return await enemigo.find();
};

export const updateEnemy = async (id: string, data: any) => {
    return await enemigo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEnemy = async (id: string) => {
    return await enemigo.findByIdAndDelete(id);
};
