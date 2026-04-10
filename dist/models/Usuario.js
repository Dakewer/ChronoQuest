"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUser = exports.createUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user = "user";
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Avatar"
    },
    experience: {
        type: Number,
        required: true
    }
});
const usuario = mongoose_1.default.model("Usuario", userSchema);
exports.default = usuario;
// CRUD operations
const createUser = async (data) => {
    return await usuario.create(data);
};
exports.createUser = createUser;
const getUser = async (id) => {
    return await usuario.findById(id);
};
exports.getUser = getUser;
const getAllUsers = async () => {
    return await usuario.find();
};
exports.getAllUsers = getAllUsers;
const updateUser = async (id, data) => {
    return await usuario.findByIdAndUpdate(id, data, { new: true });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return await usuario.findByIdAndDelete(id);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=Usuario.js.map