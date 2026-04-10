"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const combat = "combat";
const combatSchema = new mongoose_1.default.Schema({
    avatar: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Avatar"
    },
    enemy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Enemy"
    },
    result: {
        type: Boolean,
        required: true
    }
});
//# sourceMappingURL=Combate.js.map