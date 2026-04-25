// Importaciones
import mongoose, { Schema } from "mongoose";
import multer from "multer";

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        match: /@/
    },
    birday: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: false,
        default: "default.png"
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

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;