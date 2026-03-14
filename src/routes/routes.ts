"use strict";

import express from "express";
import path from "path";

export const router = express.Router()
// res.send('ok')
router.get("/", (req, res) => {
    // res.send('ok')
    res.render("home");
});

export default router;