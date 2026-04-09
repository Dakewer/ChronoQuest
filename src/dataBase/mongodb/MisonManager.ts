import mongoose, {Schema} from "mongoose";
import {Hash} from "crypto";

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        //match: /@/
        match: /@/
    },
    birday: {
        type: Date,
        required: true
    },
    // conmbinacion unica coreo y contraseña
    password: {
        type: Hash String,
        required: true
    },
    foto : {
        type: file,
        required: false,
        default: true // foto de perfil basica
        // png o jpg
    },
    descripcion: {
        type: String,
        required: false
    }
});

const users = mongoose.model("users", usuarioSchema);

// mostrar todo el usuario
export const getUsers = async () => {
    return await users.find({});
};

// Mostrar usuario parcial para otras personas, nombre, cumpleaños, coreo y descripcion
export const getUsersPrivet = async () => {
    return await users.find({});
};

// eliminar usuario
export const deleteUsers = async (email: String) => {
    return await users.deleteOne({email});
};

// Crear y/o actualizar
// No se puede cambiar el coreo
export const upCreat4Student = async (usersData: any) => {
    return await users.findOneAndUpdate(
        {
            expedient: studentData.expedient
        },
        usersData, {
            upsert: true,
            new: true
        }
    );
};