// src/routes/avatarRoutes.ts
import { Router } from "express";
import { getAvatar, createAvatar, checkAvatarStatus, updateAvatar, deleteAvatar } from "../controllers/avatarController";

const router = Router();

router.post("/", createAvatar);
router.get("/", getAvatar);
router.get("/:avatarId", checkAvatarStatus);
router.put("/:avatarId", updateAvatar);
router.delete("/:avatarId", deleteAvatar);

export default router;