"use strict";

import express from "express";
import path from "path";

import { login } from "../controllers/userController";
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
    res.render("login", { layout: "remain" });
})

router.post("/login", checkToken);

router.get("/signin", (req, res) => {
    //res.render("signin");
    res.render("signin", { layout: "remain" });
})

router.post("/signin", (req, res) => {

})

router.get("/calendar", checkToken, (req, res) => {
    res.render("calendar");
})

router.get("/profile",checkToken, (req, res) => {
    res.render("profile");
})

router.get("/clan", checkToken, (req, res) => {
    res.render("clan");
})

router.get("/add", checkToken, (req, res) => {
    res.render("add");
})

router.get("/todo", checkToken, (req, res) => {
    res.render("todo");
})

router.get("/settings", checkToken, (req, res) => {
    res.render("settings");
})

export default router;