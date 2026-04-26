// Imports
import {Request, Response} from "express";
import Habit from '../models/habit';


// Functions
async function createHabit(req: Request, res: Response) {
    try {
        let name = req.body.name,
            description = req.body.description,
            difficulty = req.body.difficulty,
            streak = 0,
            release_date = req.body.release_date,
            hour = req.body.hour;

        if (!name || !description || !difficulty || !release_date || !hour) {
            res.status(400).send({ "Error": "One or more parameters are required" });
        } else {
            let newHabit = new Habit({
                name,
                description,
                difficulty,
                streak,
                release_date,
                hour
            });
            await newHabit.save();
            res.status(201).json(newHabit);
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function getHabits(req: Request, res: Response) {
    try {
        const habits = await Habit.find();

        if (habits.length === 0) {
            res.status(404).json({ "Error": "No habits found" });
        } else {
            res.status(200).json(habits);
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function getHabitById(req: Request, res: Response) {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            res.status(404).json({ "Error": "Habit not found" });
        } else {
            res.status(200).json(habit);
        }
    } catch (error) {
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

        if (!habit) {
            res.status(404).json({ "Error": "Habit not found" });
        } else {
            res.status(200).json(habit);
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}

async function deleteHabit(req: Request, res: Response) {
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id);

        if (!habit) {
            res.status(404).json({ "Error": "Habit not found" });
        } else {
            res.status(200).json({ "Message": "Habit deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ "Error": "Internal server error" });
    }
}


// Exports
export { createHabit, getHabits, getHabitById, updateHabit, deleteHabit };