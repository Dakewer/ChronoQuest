// Imports
import mongoose, { Schema } from "mongoose";
import multer from "multer";
import {UUID} from "mongodb";

// Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /@/
    },
    password: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        required: false,
        default: "default.png"
    },
    avatar: {
        type: UUID,
        required: false,
    },
    descripcion: {
        type: String,
        required: false
    },
    // golge id
    googleID: {
        type: String,
        required: false
    }
});

// Exports
const User = mongoose.model("User", userSchema);
export default User;