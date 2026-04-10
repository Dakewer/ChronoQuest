"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.upCreateMision = exports.deleteMision = exports.getMisioOne = exports.getMisionesTags = exports.getMisiones = exports.Mision = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Enums para mantener consistencia
var TipoMision;
(function (TipoMision) {
    TipoMision[TipoMision["Habito"] = 0] = "Habito";
    TipoMision[TipoMision["Tarea"] = 1] = "Tarea";
    TipoMision[TipoMision["Evento"] = 2] = "Evento";
})(TipoMision || (TipoMision = {}));
var Dificultad;
(function (Dificultad) {
    Dificultad[Dificultad["muyFacil"] = 0] = "muyFacil";
    Dificultad[Dificultad["Facil"] = 1] = "Facil";
    Dificultad[Dificultad["medio"] = 2] = "medio";
    Dificultad[Dificultad["dificil"] = 3] = "dificil";
    Dificultad[Dificultad["muyDificil"] = 4] = "muyDificil";
    Dificultad[Dificultad["ThisIsDarkSouls"] = 5] = "ThisIsDarkSouls";
})(Dificultad || (Dificultad = {}));
const misionSchema = new mongoose_1.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    }
});
exports.Mision = mongoose_1.default.model("Mision", misionSchema);
// mostar misiones del usuario
const getMisiones = async (id) => {
    return await exports.Mision.find({ asignadaA: new mongoose_1.Types.ObjectId(id), activa: true });
};
exports.getMisiones = getMisiones;
// mostar misiones del usuario por taf
const getMisionesTags = async (id, tags) => {
    return await exports.Mision.find({
        asignadaA: new mongoose_1.Types.ObjectId(id),
        activa: true,
        tags: { $in: tags }
    });
};
exports.getMisionesTags = getMisionesTags;
// mostar una mision ne especifico
const getMisioOne = async (id, misionId) => {
    return await exports.Mision.findOne({
        _id: new mongoose_1.Types.ObjectId(misionId),
        asignadaA: new mongoose_1.Types.ObjectId(id)
    });
};
exports.getMisioOne = getMisioOne;
// eliminar mision
const deleteMision = async (misionId) => {
    return await exports.Mision.findByIdAndDelete(misionId);
};
exports.deleteMision = deleteMision;
// Crear y/o actualizar
// No se puede cambiar el usuario, ni el id, ni la racha
// si hay cambio de dificultad o de estadistica, se reinicia la racha a 0
const upCreateMision = async (misionData) => {
    // Si la misión ya existe, verificamos si cambiaron stats o dificultad
    if (misionData._id) {
        const anterior = await exports.Mision.findById(misionData._id);
        if (anterior) {
            // Si cambia lo que entrena, reiniciamos racha
            if (anterior.statAEntrenar !== misionData.statAEntrenar) {
                misionData.racha = 0;
            }
        }
    }
    return await exports.Mision.findOneAndUpdate({ _id: misionData._id || new mongoose_1.Types.ObjectId() }, misionData, { upsert: true, new: true });
};
exports.upCreateMision = upCreateMision;
//# sourceMappingURL=MisonManager.js.map