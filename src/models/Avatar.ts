"use strict";

// los elementos del mongo como las estadisticas del pj
import mongose from "mongoose";
const pj = "avatar";

// falta reyenar
const pjSchema = new mongose.Schema ({
    // elemementos del avatar
    name : {
        type: String,
        required: true
    },
    level : {
        type: Number,
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
})

// crear colecion
const avatar = mongose.model("Avatar", pjSchema);
export default avatar;

//Cruds

export const createAvatar = async (data: any) => {
    return await avatar.create(data);
};

export const getAvatar = async (id: string) => {
    return await avatar.findById(id);
};

export const getAllAvatars = async () => {
    return await avatar.find();
};

export const updateAvatar = async (id: string, data: any) => {
    return await avatar.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAvatar = async (id: string) => {
    return await avatar.findByIdAndDelete(id);
};
