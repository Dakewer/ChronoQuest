// Imports
import { Router } from "express";
import { createHabit, getHabits, getHabitById, updateHabit, deleteHabit } from "../controllers/habitController";

const router = Router();

// Rutas
router.post("/", createHabit);
router.get("/", getHabits);
router.get("/:id", getHabitById);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);


// Exports
export default router;