"use strict";

import express from "express";
import passport from "passport";
import { checkToken } from "../middleware/checkToken";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import { googleAuthMiddlware } from "../middleware/auth";
//import { MUSIC_URLS } from "../config/s3";
import { getMusicURLs } from "../config/s3";

const router = express.Router();

// rutas tipo free
// ingresar
router.get("/login", async (req, res) => {
    const music = await getMusicURLs();
    res.render("login", { layout: "remain", audio: music.CT });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).render("login", { layout: "remain", error: "Email y contraseña son requeridos" });

    try {
        const user = await User.findOne({ email }) as IUser | null;

        if (!user)
            return res.status(404).render("login", { layout: "remain", error: "Usuario no encontrado" });

        if (!user.password)
            return res.status(403).render("login", { layout: "remain", error: "Esta cuenta usa Google para iniciar sesión" });

        const valid = await user.validatePassword(password);

        if (!valid)
            return res.status(401).render("login", { layout: "remain", error: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, name: user.name },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect("/");

    } catch (error) {
        console.error("Error en POST /login:", error);
        res.status(500).render("login", { layout: "remain", error: "Error en el servidor" });
    }
});

// registrar
router.get("/signin", async (req, res) => {
    const music = await getMusicURLs();
    res.render("signin", { layout: "remain", audio: music.CT });
});

router.post("/signin", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).render("signin", { layout: "remain", error: "Todos los campos son requeridos" });

    try {
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(409).render("signin", { layout: "remain", error: "El email ya está registrado" });

        const newUser = new User({ name, email, creation_date: new Date() });
        await newUser.setPassword(password);
        await newUser.save();

        res.redirect("/login");
    } catch (error) {
        console.error("Error en POST /signin:", error);
        res.status(500).render("signin", { layout: "remain", error: "Error interno del servidor" });
    }
});

router.get("/signin/google", googleAuthMiddlware, async (req, res) => {
    const { email } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
        return res.status(409).send("El email ya está registrado");
});

router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/confirm",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    (req, res) => {
        const user = req.user as IUser;
        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, name: user.name },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect("/");
    }
);

// Rutas bloqueadas
router.get("/", checkToken, async (req, res) => {
    const music = await getMusicURLs();
    res.render("home", { audio: music.DQ });
});

router.get("/calendar", checkToken, async (req, res) => {
    const music = await getMusicURLs();
    res.render("calendar", { audio: music.DQ });
});

router.get("/profile", checkToken, async (req, res) => {
    const music = await getMusicURLs();
    res.render("profile", { audio: music.KQ });
});

router.get("/clan", checkToken, async (req, res) => {
    const music = await getMusicURLs();
    res.render("clan", { audio: music.KQ });
});

router.get("/add", checkToken, async (req, res) => {
    const music = await getMusicURLs();
    res.render("add", { audio: music.DQ });
});

router.get("/todo", checkToken, async (req, res) => {
    const music = await getMusicURLs();
    res.render("todo", { audio: music.DQ });
});

router.get("/settings", checkToken, async (req, res) => {
    const music = await getMusicURLs();
    res.render("settings", { audio: music.NC });
});

export default router;