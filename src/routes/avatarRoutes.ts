// Imports
import { Router } from "express";
import { getAvatar, createAvatar, checkAvatarStatus, updateAvatar, deleteAvatar } from "../controllers/avatarController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Avatar:
 *       type: object
 *       required:
 *         - name
 *         - class
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *           example: "664f1b2c9e1a2b3c4d5e6f7c"
 *         name:
 *           type: string
 *           description: Nombre del avatar
 *           example: "Guerrero del Norte"
 *         class:
 *           type: string
 *           description: Clase o tipo del avatar
 *           example: "Guerrero"
 *         level:
 *           type: number
 *           description: Nivel actual del avatar
 *           example: 5
 *         experience:
 *           type: number
 *           description: Experiencia acumulada
 *           example: 1200
 *         status:
 *           type: string
 *           description: Estado actual del avatar
 *           example: "activo"
 *     AvatarInput:
 *       type: object
 *       required:
 *         - name
 *         - class
 *       properties:
 *         name:
 *           type: string
 *           example: "Guerrero del Norte"
 *         class:
 *           type: string
 *           example: "Guerrero"
 *         level:
 *           type: number
 *           example: 1
 *         experience:
 *           type: number
 *           example: 0
 *         status:
 *           type: string
 *           example: "activo"
 */

/**
 * @swagger
 * /avatars:
 *   post:
 *     summary: Crear un nuevo avatar
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvatarInput'
 *     responses:
 *       201:
 *         description: Avatar creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avatar'
 *       400:
 *         description: Datos inválidos o campos requeridos faltantes
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.post("/", createAvatar);

/**
 * @swagger
 * /avatars:
 *   get:
 *     summary: Obtener el avatar del usuario autenticado
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Avatar encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avatar'
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Avatar no encontrado
 */
router.get("/", getAvatar);

/**
 * @swagger
 * /avatars/{avatarId}:
 *   get:
 *     summary: Verificar el estado de un avatar por ID
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del avatar
 *         example: "664f1b2c9e1a2b3c4d5e6f7c"
 *     responses:
 *       200:
 *         description: Estado del avatar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avatar'
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Avatar no encontrado
 */
router.get("/:avatarId", checkAvatarStatus);

/**
 * @swagger
 * /avatars/{avatarId}:
 *   put:
 *     summary: Actualizar un avatar por ID
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del avatar
 *         example: "664f1b2c9e1a2b3c4d5e6f7c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvatarInput'
 *     responses:
 *       200:
 *         description: Avatar actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avatar'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Avatar no encontrado
 */
router.put("/:avatarId", updateAvatar);

/**
 * @swagger
 * /avatars/{avatarId}:
 *   delete:
 *     summary: Eliminar un avatar por ID
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: avatarId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del avatar
 *         example: "664f1b2c9e1a2b3c4d5e6f7c"
 *     responses:
 *       200:
 *         description: Avatar eliminado exitosamente
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Avatar no encontrado
 */
router.delete("/:avatarId", deleteAvatar);

// Exports
export default router;