"use strict";
// index principal, pero no soy fan de llamar a las cosas index
import { config } from "dotenv" // <-- debe que iniciarse antesde de las rutas
config();

import express from "express";
import path from "path";
import routes from "./routes/routes";
import { engine } from "express-handlebars";
import { connectDB } from "./dataBase/index";

const port = process.env.PORT || 3005;
const app = express();

connectDB();

// Configuración de handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// app.set("views", "./../views");
app.set("views", path.join(__dirname, "views"))

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
// no sé si se requiera despues uno de js

app.use("/", routes)

// Muestra el link en la consolo para nomas picarle :)
app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`);
})
