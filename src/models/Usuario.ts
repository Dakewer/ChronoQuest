"use strict";

import mongoose from "mongoose";
const user = "user";

const userSchema = new mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    avatar : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avatar"
    },
    experience : {
        type: Number,
        required: true
    }
});

const usuario = mongoose.model("Usuario", userSchema);
export default usuario;

// CRUD operations
export const createUser = async (data: any) => {
    return await usuario.create(data);
};

export const getUser = async (id: string) => {
    return await usuario.findById(id);
};

export const getAllUsers = async () => {
    return await usuario.find();
};

export const updateUser = async (id: string, data: any) => {
    return await usuario.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
    return await usuario.findByIdAndDelete(id);
};