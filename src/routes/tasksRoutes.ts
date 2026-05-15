// Imports
import { Router } from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask, completeTask } from "../controllers/taskController";
import { checkToken } from "../middleware/checkToken";
 
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - difficulty
 *         - attribute
 *         - end_date
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *           example: "664f1b2c9e1a2b3c4d5e6f7b"
 *         name:
 *           type: string
 *           description: Nombre de la tarea
 *           example: "Leer 20 páginas"
 *         description:
 *           type: string
 *           description: Descripción opcional de la tarea
 *           example: "Leer el libro de clean code"
 *         difficulty:
 *           type: number
 *           description: Nivel de dificultad de la tarea
 *           example: 2
 *         attribute:
 *           type: string
 *           description: Atributo o categoría asociada a la tarea
 *           example: "Inteligencia"
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: Fecha límite para completar la tarea
 *           example: "2024-12-31T23:59:59.000Z"
 *     TaskInput:
 *       type: object
 *       required:
 *         - name
 *         - difficulty
 *         - attribute
 *         - end_date
 *       properties:
 *         name:
 *           type: string
 *           example: "Leer 20 páginas"
 *         description:
 *           type: string
 *           example: "Leer el libro de clean code"
 *         difficulty:
 *           type: number
 *           example: 2
 *         attribute:
 *           type: string
 *           example: "Inteligencia"
 *         end_date:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59.000Z"
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos o campos requeridos faltantes
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.post("/", checkToken, createTask);



/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get("/", checkToken, getTasks);



/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *         example: "664f1b2c9e1a2b3c4d5e6f7b"
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", checkToken, getTaskById);



/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *         example: "664f1b2c9e1a2b3c4d5e6f7b"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/:id", checkToken, updateTask);


/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *         example: "664f1b2c9e1a2b3c4d5e6f7b"
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", checkToken, deleteTask);

// ruta formulario
router.post("/add", checkToken, createTask);

// ruta MISION COMPLITED
router.patch("/:id/complete", checkToken, completeTask);

// Exports
export default router;