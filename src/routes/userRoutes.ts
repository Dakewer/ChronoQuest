// Imports
import { Router } from "express";
import { getUsers, getUserByEmail, getUserById, deleteUserByEmail, deleteUserById, updateUser } from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *           example: "664f1b2c9e1a2b3c4d5e6f7d"
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: "juan@correo.com"
 *         creation_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la cuenta
 *           example: "2024-01-01T00:00:00.000Z"
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           example: "juan@correo.com"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Obtener un usuario por email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario
 *         example: "juan@correo.com"
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/email/:email", getUserByEmail);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *         example: "664f1b2c9e1a2b3c4d5e6f7d"
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *         example: "664f1b2c9e1a2b3c4d5e6f7d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *         example: "664f1b2c9e1a2b3c4d5e6f7d"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", deleteUserById);

// Exports
export default router;