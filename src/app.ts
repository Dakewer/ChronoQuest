"use strict";
import { config } from "dotenv";
config();

import express from "express";
import path from "path";
import routes from "./routes/routes";
import { engine } from "express-handlebars";
import { connectDB } from "./dataBase/mongodb";
import passport from "passport";
import { googleAuthMiddlware } from "./middleware/auth";
import cookieParser from "cookie-parser";
//import { STYLE_URLS } from "./config/s3";
import { getStyleURLs } from "./config/s3";

const port = process.env.PORT || 3005;
const app = express();

connectDB();

// Configuración de handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(async (req, res, next) => {
    res.locals.styles = await getStyleURLs();
    next();
});

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

googleAuthMiddlware(app);
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

// Hace que {{styles.main}} esté disponible en todos los handlebars sin pasarlo en cada ruta
app.use(async (req, res, next) => {
    res.locals.styles = await getStyleURLs();
    next();
})

app.use("/", routes);

app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`);
});