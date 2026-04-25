import mongoose, { Schema, Types } from "mongoose";

// Enums para mantener consistencia
enum TipoMision {
    Habito,
    Tarea,
    Evento
}
enum Dificultad {
    muyFacil,
    Facil,
    medio,
    dificil,
    muyDificil,
    ThisIsDarkSouls
}

const misionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tipo: {
        type: TipoMision,
        required: true
    },
    descripcion: {
        type: String
    },
    asignadaA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    statASubir: {
        type: String,
        required: true
    },
    puntosExp: {
        type: Number,
        default: 10
    },

    racha: {
        type: Number,
        default: 0
    },
    activa: {
        type: Boolean,
        default: true
    },
    fechaFin: {
        type: Date
    },
    dificultad: {
        type: Dificultad,
        default: Dificultad.medio
    }
});

export const Mision = mongoose.model("Mision", misionSchema);

// mostar misiones del usuario
export const getMisiones = async (id: string) => {
    return await Mision.find({ asignadaA: new Types.ObjectId(id), activa: true });
};

// mostar misiones del usuario por taf
export const getMisionesTags = async (id: string, tags: string[]) => {
    return await Mision.find({ 
        asignadaA: new Types.ObjectId(id),
        activa: true, 
        tags: { $in: tags } 
    });
};

// mostar una mision ne especifico
export const getMisioOne = async (id: string, misionId: string) => {
    return await Mision.findOne({ 
        _id: new Types.ObjectId(misionId), 
        asignadaA: new Types.ObjectId(id)
    });
};

// eliminar mision
export const deleteMision = async (misionId: string) => {
    return await Mision.findByIdAndDelete(misionId);
};

// Crear y/o actualizar
// No se puede cambiar el usuario, ni el id, ni la racha
// si hay cambio de dificultad o de estadistica, se reinicia la racha a 0
export const upCreateMision = async (misionData: any) => {
    // Si la misión ya existe, verificamos si cambiaron stats o dificultad
    if (misionData._id) {
        const anterior = await Mision.findById(misionData._id);
        if (anterior) {
            // Si cambia lo que entrena, reiniciamos racha
            if (anterior.statASubir !== misionData.statASubir) {
                misionData.racha = 0;
            }
        }
    }

    return await Mision.findOneAndUpdate(
        { _id: misionData._id || new Types.ObjectId() },
        misionData,
        { upsert: true, new: true }
    );
};