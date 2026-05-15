import { Router } from "express";
import { checkToken } from "../middleware/checkToken";
import { renderCalendar } from "../controllers/calendarController";

const router = Router();

router.get("/", checkToken, renderCalendar);

export default router;