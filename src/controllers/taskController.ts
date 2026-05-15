// Imports
import { Request, Response } from "express";
import Task from '../models/task';

// Functions
async function createTask(req: Request, res: Response) {
    try {
        const userId = req.Usuario?.id;
        if (!userId)
            return res.status(401).json({ "Error": "No autenticado" });

        let name = req.body.name,
            description = req.body.description || "",
            difficulty = req.body.difficulty,
            attribute = req.body.attribute,
            end_date = req.body.end_date;

        if (!name || !difficulty || !attribute || !end_date) {
            // pintar error en html
            if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded"))
                return res.redirect("/add?error=Faltan+campos+requeridos");
            return res.status(400).json({ "Error": "Faltan campos requeridos: name, difficulty, attribute, end_date" });
        }

        let newTask = new Task({
            name,
            description,
            difficulty: Number(difficulty),
            attribute,
            end_date: new Date(end_date),
            asignadaA: userId,
            completada: false
        });
        await newTask.save();

        // Si redirigir a to-do
        if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded"))
            return res.redirect("/todo");
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Error en createTask:", error);
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function getTasks(req: Request, res: Response) {
    try {
        const userId = req.Usuario?.id;
        const filter = userId ? { asignadaA: userId, completada: false } : { completada: false };
        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function getTaskById(req: Request, res: Response) {
    try {
        const task = await Task.findById(req.params.id);

        if (!task)
            res.status(404).json({ "Error": "Task not found" });
        else
            res.status(200).json(task);
    } 
    catch (error) {
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

        if (!task)
            res.status(404).json({ "Error": "Task not found" });
        else
            res.status(200).json(task);
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function deleteTask(req: Request, res: Response) {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task)
            res.status(404).json({ "Error": "Task not found" });
        else
            res.status(200).json({ "Message": "Task deleted successfully" });
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

// Marcar tarea como completada Yei
async function completeTask(req: Request, res: Response) {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { completada: true },
            { new: true }
        );

        if (!task)
            return res.status(404).json({ "Error": "Task not found" });

        res.status(200).json({ ok: true, task });
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}


// Exports
export { createTask, getTasks, getTaskById, updateTask, deleteTask, completeTask };