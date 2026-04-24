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
        required: false
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
    }
})

// Exports
const Task = mongoose.model("Task", taskSchema);
export default Task;