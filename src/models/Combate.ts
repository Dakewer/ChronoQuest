"use strict";

import mongoose from "mongoose";
import avatar from "./Avatar";
const combat = "combat";

const combatSchema = new mongoose.Schema ({
    avatar : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avatar"
    },
    enemy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enemy"
    },
    result : {
        type: Boolean,
        required: true
    }
});

const combate = mongoose.model("Combate", combatSchema);
export default combate;

//Cruda Again
export const createCombat = async (data: any) => {
    return await combate.create(data);
};

export const getCombat = async (id: string) => {
    return await combate.findById(id);
};

export const getAllCombats = async () => {
    return await combate.find();
};

export const updateCombat = async (id: string, data: any) => {
    return await combate.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCombat = async (id: string) => {
    return await combate.findByIdAndDelete(id);
};
