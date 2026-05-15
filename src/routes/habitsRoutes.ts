// Imports
import { Router } from "express";
import { createHabit, getHabits, getHabitById, updateHabit, deleteHabit } from "../controllers/habitController";
import { checkToken } from "../middleware/checkToken";

const router = Router();

// Routes

/**
 * @swagger
 * components:
 *   schemas:
 *     Habit:
 *       type: object
 *       required:
 *         - name
 *         - difficulty
 *         - streak
 *         - release_date
 *         - hour
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *           example: "664f1b2c9e1a2b3c4d5e6f7a"
 *         name:
 *           type: string
 *           description: Nombre del hábito
 *           example: "Ejercicio matutino"
 *         description:
 *           type: string
 *           description: Descripción opcional del hábito
 *           example: "Rutina de 30 minutos cada mañana"
 *         difficulty:
 *           type: number
 *           description: Nivel de dificultad del hábito
 *           example: 3
 *         streak:
 *           type: number
 *           description: Racha actual del hábito (días consecutivos)
 *           example: 7
 *         release_date:
 *           type: array
 *           description: Fechas de registro o activación del hábito
 *           items:
 *             type: string
 *           example: ["2024-01-01", "2024-01-02"]
 *         hour:
 *           type: string
 *           format: date-time
 *           description: Hora programada para el hábito
 *           example: "2024-01-01T07:00:00.000Z"
 *     HabitInput:
 *       type: object
 *       required:
 *         - name
 *         - difficulty
 *         - streak
 *         - release_date
 *         - hour
 *       properties:
 *         name:
 *           type: string
 *           example: "Ejercicio matutino"
 *         description:
 *           type: string
 *           example: "Rutina de 30 minutos cada mañana"
 *         difficulty:
 *           type: number
 *           example: 3
 *         streak:
 *           type: number
 *           example: 7
 *         release_date:
 *           type: array
 *           items:
 *             type: string
 *           example: ["2024-01-01", "2024-01-02"]
 *         hour:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T07:00:00.000Z"
 */

/**
 * @swagger
 * /habits:
 *   post:
 *     summary: Crear un nuevo hábito
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HabitInput'
 *     responses:
 *       201:
 *         description: Hábito creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 *       400:
 *         description: Datos inválidos o campos requeridos faltantes
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.post("/", checkToken, createHabit);



/**
 * @swagger
 * /habits:
 *   get:
 *     summary: Obtener todos los hábitos
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de hábitos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Habit'
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get("/", getHabits);



/**
 * @swagger
 * /habits/{id}:
 *   get:
 *     summary: Obtener un hábito por ID
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hábito
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
 *     responses:
 *       200:
 *         description: Hábito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Hábito no encontrado
 */
router.get("/:id", getHabitById);



/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Actualizar un hábito por ID
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hábito
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HabitInput'
 *     responses:
 *       200:
 *         description: Hábito actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habit'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Hábito no encontrado
 */
router.put("/:id", updateHabit);



/**
 * @swagger
 * /habits/{id}:
 *   delete:
 *     summary: Eliminar un hábito por ID
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del hábito
 *         example: "664f1b2c9e1a2b3c4d5e6f7a"
 *     responses:
 *       200:
 *         description: Hábito eliminado exitosamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Hábito no encontrado
 */
router.delete("/:id", deleteHabit);


// Exports
export default router;