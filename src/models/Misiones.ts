"use strict";

import mongoose from "mongoose";
const mission = "mission";

const missionSchema = new mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    reward : {
        type: Number,
        required: true
    },
    complition : {
        type: Boolean,
        required: true
    } 
});

const mision = mongoose.model("Mision", missionSchema);
export default mision;

// CRUD operations
export const createMission = async (data: any) => {
    return await mision.create(data);
};

export const getMission = async (id: string) => {
    return await mision.findById(id);
};

export const getAllMissions = async () => {
    return await mision.find();
};

export const updateMission = async (id: string, data: any) => {
    return await mision.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMission = async (id: string) => {
    return await mision.findByIdAndDelete(id);
};
