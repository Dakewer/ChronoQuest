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

export default usuarioSchema;

export const Users = mongoose.model("Users", usuarioSchema);

// mostrar todo el usuario
export const getUsers = async (userID: string) => { 
    return await Users.findById(userID);
};

// Mostrar usuario por email
export const getOneUsers = async (email: string) => { 
    return await Users.findOne({ mail: email });
};

// eliminar usuario
export const deleteUsers = async (email: string) => { 
    return await Users.findOneAndDelete({ mail: email });
};

// Crear y/o actualizar
// Nota: No se puede cambiar el correo
export const upCreateUser = async (userData: any) => {
    return await Users.findOneAndUpdate({
            mail: userData.mail
        },
        userData, {
            upsert: true,
            new: true
        }
    );
};