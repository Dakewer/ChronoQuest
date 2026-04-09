import mongoose, {Schema} from "mongoose";
import {Hash} from "crypto";

eenum
clase
{
    // level 1
    aprendis: 001,
    // level 1
    mago: 101
    espadachin : 002
    nigromante : 003
}

// dos tipos de estadisticas, las suyas y las que entrena (eredar)
const avatarSchema = new Schema({
    activo : {
        type: Boolean,
        default: true
    },
    tipo: {
        type: clase,
        required: true
    },
    creacion: {
        type: Date,
        required: true
    },
    ataque : {
        type : Number,
        required : true,
        default: 1
    },
    defensa : {
        type : Number,
        required : true,
        default: 1
    },
    velocidad : {
        type : Number,
        required : true,
        default: 1
    },
    suerte : {
        type : Number,
        required : true,
        default: 1
    },
    perteneceA : {
        type : uuid,
        required : true,
    }
});

const avatar = mongoose.model("avatar", avataroSchema);

// mostrar todo el usuario
export const getUsers = async () => {
    return await users.find({});
};

// actualizar: Subir estadisticas
export const upAvatar = async (usersData: any) => {
    return await users.Update(
        {
            expedient: studentData.expedient
        },
        usersData, {
            upsert: true,
            new: true
        }
    );
};

// revisar que su tiempo de expiracion siga activo

// nombre de usuario