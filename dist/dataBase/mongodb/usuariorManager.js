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
exports.upCreateUser = exports.deleteUsers = exports.getOneUsers = exports.getUsers = exports.Users = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const usuarioSchema = new mongoose_1.Schema({
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
exports.Users = mongoose_1.default.model("Users", usuarioSchema);
// mostrar todo el usuario
const getUsers = async () => {
    return await exports.Users.find({});
};
exports.getUsers = getUsers;
// Mostrar usuario por email
const getOneUsers = async (email) => {
    return await exports.Users.findOne({ mail: email });
};
exports.getOneUsers = getOneUsers;
// eliminar usuario
const deleteUsers = async (email) => {
    return await exports.Users.findOneAndDelete({ mail: email });
};
exports.deleteUsers = deleteUsers;
// Crear y/o actualizar
// Nota: No se puede cambiar el correo
const upCreateUser = async (userData) => {
    return await exports.Users.findOneAndUpdate({
        mail: userData.mail
    }, userData, {
        upsert: true,
        new: true
    });
};
exports.upCreateUser = upCreateUser;
//# sourceMappingURL=usuariorManager.js.map