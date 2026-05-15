"use strict";

import express from "express";
import passport from "passport";
import { checkToken } from "../middleware/checkToken";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import { googleAuthMiddlware } from "../middleware/auth";

const router = express.Router();

// rutas tipo free
// ingresar
router.get("/login", (_req, res) => {
    //res.render("login");
    // res.render("login", { layout: false });
    res.render("login", { layout: "remain", audio: "CT.mp3" });
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).render("login", { layout: "remain", error: "Email y contraseña son requeridos" });

    try {
        const user = await User.findOne({ email }) as IUser | null;

        if (!user)
            return res.status(404).render("login", { layout: "remain", error: "Usuario no encontrado" });

        if (!user.password)
            return res.status(403).render("login", { layout: "remain", error: "Esta cuenta usa Google para iniciar sesión"});

        const valid = await user.validatePassword(password);

        if (!valid)
            return res.status(401).render("login", { layout: "remain", error: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: user._id.toString(), email: user.email, name: user.name },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        // guardarlo en cookie y redirigir
        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect("/");

    } catch (error) {
        console.error("Error en POST /login:", error);
        res.status(500).render("login", { layout: "remain", error: "Error en el servidor" });
    }
});

// registrar
router.get("/signin", (_req, res) => {
    //res.render("signin");
    res.render("signin", { layout: "remain" , audio: "CT.mp3"});
})

// los errorres en postman son send, para el navegador es render
router.post("/signin", async (req, res) => {
    const { name, email, password } = req.body;

    // evitar que cuando este mal borre datos ... pero como
    if (!name || !email || !password)
        // return res.status(400).render("signin", { layout: "remain", error: "Todos los campos son requeridos" });
        return res.status(400).render("signin", {layout: "remain", error: "Todos los campos son requeridos", name, email});

    try {
        // Verificar si ya existe
        const existing = await User.findOne({ email });
        if (existing)
            //return res.status(409).render("signin", { layout: "remain", error: "El email ya está registrado" });
            return res.status(409).render("signin", {layout: "remain", error: "El email ya está registrado", name, email });

        const newUser = new User({ name, email, creation_date: new Date() });
        await newUser.setPassword(password);
        await newUser.save();

        //res.redirect("/login");
        const token = jwt.sign(
            { id: newUser._id.toString(), email: newUser.email, name: newUser.name },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect("/");

    } catch (error) {
        console.error("Error en POST /signin:", error);
        res.status(500).render("signin", { layout: "remain", error: "Error interno del servidor" });
    }
});

// registrarse con el boton de google
router.get("/signin/google", googleAuthMiddlware, async (req, res) => {
    const { email } = req.body;
    // crear/obtener datos de google y despues jweb token y redirigir
    const existing = await User.findOne({ email });
    if (existing)
        return res.status(409).send("El email ya está registrado" );
    //res.send("ya existen")
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
// cambiar a las que deben que estar cerradas, ejemplo
router.get("/", checkToken, (req, res) => {
    // res.send('ok')
    res.render("home", { audio: "DQ.mp3" });
});

router.get("/calendar", checkToken, (req, res) => {
    res.render("calendar", { audio: "DQ.mp3" });
})

router.get("/profile",checkToken, (req, res) => {
    res.render("profile", { audio: "KQ.mp3" });
})

router.get("/clan", checkToken, (req, res) => {
    res.render("clan", { audio: "KQ.mp3" });
})

router.get("/add", checkToken, (req, res) => {
    res.render("add", { audio: "DQ.mp3" });
})

router.get("/todo", checkToken, (req, res) => {
    res.render("todo", { audio: "DQ.mp3" });
})

router.get("/settings", checkToken, (req, res) => {
    res.render("settings", { audio: "NC.mp3" });
})

export default router;