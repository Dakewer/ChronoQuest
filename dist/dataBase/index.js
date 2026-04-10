"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = require("dotenv"); // <-- debe que iniciarse antesde de las rutas
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("No se encontro la url en el .env");
        }
        await mongoose_1.default.connect(uri);
        console.log("Se logro Yei");
    }
    catch (error) {
        // Es mejor ver el error real que solo decir "muerte fatal" para debuguear
        console.error('Error crítico al conectar a la base de datos:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=index.js.map