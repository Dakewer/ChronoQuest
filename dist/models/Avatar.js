"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// los elementos del mongo como las estadisticas del pj
const mogoose_1 = __importDefault(require("mogoose"));
const pj = "avatar";
// falta reyenar
const pjSchema = new mogoose_1.default.Schema({
    // elemementos del avatar
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    attack: {
        type: Number,
        required: true
    }
});
// crear colecion
const avatar = mogoose_1.default.model("Avatar", pjSchema);
exports.default = avatar;
//# sourceMappingURL=Avatar.js.map