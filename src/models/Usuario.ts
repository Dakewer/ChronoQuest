import mongoose, {
    Schema
} from "mongoose";

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
        default: "default.png" // carpeta de fotos de public
    },
    descripcion: {
        type: String,
        required: false
    }
});

export const Users = mongoose.model("Users", usuarioSchema);
