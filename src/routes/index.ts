"use strict";

import express from "express";
import path from "path";
const router = express.Router()

// Se supone que aqui van las rutas del proyecto

// Hacer estatico lo estatico (el css)
router.use("/", express.static("public"));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/layouts/main.handlebars"));
});

export default router;