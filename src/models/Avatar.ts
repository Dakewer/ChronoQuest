// Imports
import mongoose, { Schema } from "mongoose";
import {UUID} from "mongodb";

// Schema
const avatarSchema = new Schema({
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    class: {
        type: String,
        required: true
    },
    strength: {
        type: Number,
        required: true
    },
    dexterity: {
        type: Number,
        required: true
    },
    constitution: {
        type: Number,
        required: true
    },
    victory_rate: {
        type: Number,
        required: true
    },
    victory: {
        type: Number,
        required: true,
        default: 0
    },
    derotas: {
        type: Number,
        required: true,
        default: 0
    },
    activo: {
        type: Boolean,
        default: true
    },
    fechaFin: {
        type: Date,
        required: true
    }
})


// Exports
const Avatar = mongoose.model("Avatar", avatarSchema);
export default Avatar;