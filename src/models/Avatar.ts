// Imports
import mongoose, { Schema } from "mongoose";
import {UUID} from "mongodb";

// Schema
const avatarSchema = new Schema({
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
    }
})


// Exports
const Avatar = mongoose.model("Avatar", avatarSchema);
export default Avatar;