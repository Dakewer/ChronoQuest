// Imports
import {Request, Response} from "express";
import Task from '../models/task';


// Functions
async function createTask(req: Request, res: Response) {
    try {
        let name = req.body.name,
            description = req.body.description,
            difficulty = req.body.difficulty,
            attribute = req.body.attribute,
            end_date = req.body.end_date;

        if (!name || !description || !difficulty || !attribute || !end_date) {
            res.status(400).send({ "Error": "One or more parameters are required" });
        } else {
            let newTask = new Task({
                name,
                description,
                difficulty,
                attribute,
                end_date
            });
            await newTask.save();
            res.status(201).json(newTask);
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}


async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await Task.find();

        if (tasks.length === 0) {
            res.status(404).json({ "Error": "No tasks found" });
        } else {
            res.status(200).json(tasks);
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function getTaskById(req: Request, res: Response) {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ "Error": "Task not found" });
        } else {
            res.status(200).json(task);
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function updateTask(req: Request, res: Response) {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!task) {
            res.status(404).json({ "Error": "Task not found" });
        } else {
            res.status(200).json(task);
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function deleteTask(req: Request, res: Response) {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            res.status(404).json({ "Error": "Task not found" });
        } else {
            res.status(200).json({ "Message": "Task deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}


// Exports
export { createTask, getTasks, getTaskById, updateTask, deleteTask };