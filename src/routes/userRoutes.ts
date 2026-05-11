// src/routes/userRoutes.ts
import { Router } from "express";
import { getUsers, getUserByEmail, getUserById, deleteUserByEmail, deleteUserById, updateUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUserById);

export default router;