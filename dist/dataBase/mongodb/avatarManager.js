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
exports.checkAvatar = exports.upAvatar = exports.getAvatar = exports.Avatar = exports.ClaseAvatar = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var ClaseAvatar;
(function (ClaseAvatar) {
    ClaseAvatar[ClaseAvatar["Aprendiz"] = 1] = "Aprendiz";
    ClaseAvatar[ClaseAvatar["Mago"] = 1001] = "Mago";
    ClaseAvatar[ClaseAvatar["Espadachin"] = 1002] = "Espadachin";
    ClaseAvatar[ClaseAvatar["Nigromante"] = 1003] = "Nigromante";
})(ClaseAvatar || (exports.ClaseAvatar = ClaseAvatar = {}));
// Estructura para los 3 tipos de estadisticas
const statSchema = {
    // por clase
    base: {
        type: Number,
        default: 0
    },
    // por misiones
    entrenada: {
        type: Number,
        default: 0
    },
    // por otro pj
    heredada: {
        type: Number,
        default: 0
    }
};
const avatarSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }, // Nombre del bicho,separado del del usuario
    activo: {
        type: Boolean,
        default: true
    },
    tipo: {
        type: Number,
        enum: [1, 1001, 1002, 1003],
        required: true
    },
    creacion: {
        type: Date,
        default: Date.now
    },
    fechaFin: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    stats: {
        fuerza: statSchema,
        velocidad: statSchema,
        suerte: statSchema,
        defensa: statSchema,
        vida: statSchema
    },
    // Límites de entrenamiento RPG
    entrenamientop: {
        type: Number,
        default: 0
    },
    maxEntrenamiento: {
        type: Number,
        default: 100
    },
    perteneceA: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});
exports.Avatar = mongoose_1.default.model("Avatar", avatarSchema);
const getAvatar = async (userId) => {
    return await exports.Avatar.findOne({
        perteneceA: new mongoose_1.Types.ObjectId(userId),
        activo: true
    });
};
exports.getAvatar = getAvatar;
// actualizar: Subir estadisticas
const upAvatar = async (avatarId, updateData) => {
    return await exports.Avatar.findByIdAndUpdate(avatarId, {
        $set: updateData
    }, {
        new: true
    } // Devolver ya actualizado
    );
};
exports.upAvatar = upAvatar;
// revisar que su tiempo de expiracion siga activo
const checkAvatar = async (avatarId) => {
    const heroe = await exports.Avatar.findById(avatarId);
    if (!heroe)
        return false;
    if (heroe.fechaFin < new Date()) {
        heroe.activo = false;
        await heroe.save();
        return false;
        // evoluvionar o matar al heroe
    }
    return heroe.activo;
};
exports.checkAvatar = checkAvatar;
//# sourceMappingURL=avatarManager.js.map