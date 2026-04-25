"use strict";

import express from "express";
import path from "path";

import { login } from "../controllers/usuarioController";
import { checkToken } from "../middleware/checkToken";

const router = express.Router()
/*
router.get("/", (req, res) => {
    // res.send('ok')
    res.render("home");
});
*/

// cambiar a las que deben que estar cerradas, ejemplo 
router.get("/", checkToken, (req, res) => {
    // res.send('ok')
    res.render("home");
});

router.get("/login", (req, res) => {
    //res.render("login");
    // res.render("login", { layout: false });
    res.render("login", { layout: "salmon" });
})

router.post("/login", login);

router.get("/signin", (req, res) => {
    //res.render("signin");
    res.render("signin", { layout: "salmon" });
})

router.post("/signin", (req, res) => {

})

router.get("/calendar", (req, res) => {
    res.render("calendar");
})

router.get("/profile", (req, res) => {
    res.render("profile");
})

router.get("/clan", (req, res) => {
    res.render("clan");
})

router.get("/add", (req, res) => {
    res.render("add");
})

router.get("/todo", (req, res) => {
    res.render("todo");
})

router.get("/settings", (req, res) => {
    res.render("settings");
})

export default router;