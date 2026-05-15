// Imports
import { Request, Response } from "express";
import Habit from '../models/habit';


// Functions
async function createHabit(req: Request, res: Response) {
    try {
        const userId = req.Usuario?.id;
        if (!userId)
            return res.status(401).json({ "Error": "No autenticado" });

        let name = req.body.name,
            description = req.body.description || "",
            difficulty = req.body.difficulty,
            release_date = req.body.release_date,
            hour = req.body.hour;

        // llega como array de checkboxes
        const diasArray = Array.isArray(release_date)
            ? release_date
            : release_date ? [release_date] : [];

        if (!name || !difficulty || diasArray.length === 0) {
            if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded"))
                return res.redirect("/add?error=Faltan+campos+requeridos");

            return res.status(400).json({ "Error": "Faltan campos requeridos: name, difficulty, al menos un día" });
        }

        let newHabit = new Habit({
            name,
            description,
            difficulty: Number(difficulty),
            streak: 0,
            release_date: diasArray,
            hour: hour || null,
            asignadaA: userId,
            completada: false
        });
        await newHabit.save();

        if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded"))
            return res.redirect("/todo");
        res.status(201).json(newHabit);

    } 
    catch (error) {
        console.error("Error en createHabit:", error);
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function getHabits(req: Request, res: Response) {
    try {
        const userId = req.Usuario?.id;
        const filter = userId ? { asignadaA: userId, completada: false } : { completada: false };
        const habits = await Habit.find(filter);
        res.status(200).json(habits);
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function getHabitById(req: Request, res: Response) {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit)
            res.status(404).json({ "Error": "Habit not found" });
        else
            res.status(200).json(habit);
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function updateHabit(req: Request, res: Response) {
    try {
        const { streak, ...updateData } = req.body;

        const habit = await Habit.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!habit)
            res.status(404).json({ "Error": "Habit not found" });
        else
            res.status(200).json(habit);
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function deleteHabit(req: Request, res: Response) {
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id);

        if (!habit)
            res.status(404).json({ "Error": "Habit not found" });
        else
            res.status(200).json({ "Message": "Habit deleted successfully" });
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

// Marcar hábito como completado y aumenta racha
async function completeHabit(req: Request, res: Response) {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit)
            return res.status(404).json({ "Error": "Habit not found" });

        habit.streak = (habit.streak || 0) + 1;
        habit.completada = true;
        await habit.save();

        res.status(200).json({ ok: true, habit });
    } 
    catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

// Exports
export { createHabit, getHabits, getHabitById, updateHabit, deleteHabit, completeHabit };