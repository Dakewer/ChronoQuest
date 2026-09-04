// Imports
import mongoose, { Schema } from "mongoose";

// Schema
const habitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    difficulty: {
        type: Number,
        required: true
    },
    streak: {
        type: Number,
        required: true,
        default: 0
    },
    release_date: {
        type: Array,
        required: true
    },
    hour: {
        type: String,
        required: false,
        default: null
    },
    asignadaA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completada: {
        type: Boolean,
        default: false
    }
})

// Exports
const Habit = mongoose.model("Habit", habitSchema);
export default Habit;