// Imports
import mongoose, { Schema } from "mongoose";

// Schema
const taskSchema = new Schema({
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
        required: true,
    },
    attribute: {
        type: String,
        required: true
    },
    end_date: {
        type: Date,
        required: true
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
const Task = mongoose.model("Task", taskSchema);
export default Task;