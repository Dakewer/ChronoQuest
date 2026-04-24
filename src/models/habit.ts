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
        required: false
    },
    difficulty: {
        type: Number,
        required: true
    },
    streak: {
        type: Number,
        required: true
    },
    release_date: {
        type: Array,
        required: true
    },
    hour: {
        type: Date,
        required: true
    }
})

// Exports
const Habit = mongoose.model("Habit", habitSchema);
export default Habit;