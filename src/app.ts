"use strict";
import { config } from "dotenv";
config();

import express from "express";
import path from "path";
import http from "http";
import routes from "./routes/routes";
import { engine } from "express-handlebars";
import { connectDB } from "./dataBase/mongodb";
import passport from "passport";
import { googleAuthMiddlware } from "./middleware/auth";
import cookieParser from "cookie-parser";
import { Server as SocketServer } from "socket.io";
import { motivacion } from "./core/soket";
import { getStyleURLs } from "./config/s3";
import tasksRoutes from "./routes/tasksRoutes";
import habitsRoutes from "./routes/habitsRoutes";

const port = normalizePort(process.env.PORT || "3005");
const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

motivacion(io);

function normalizePort(value: string) {
  const portNumber = parseInt(value, 10);
  if (Number.isNaN(portNumber)) {
    return 3005;
  }
  return portNumber;
}

// conectar base de datos
connectDB();

// Configuración de handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));

// Body parsers — SIEMPRE antes de las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

googleAuthMiddlware(app);
app.use(passport.initialize());

// Styles disponibles en todos los handlebars
app.use(async (req, res, next) => {
    res.locals.styles = await getStyleURLs();
    next();
});

// Rutas
app.use('/tasks', tasksRoutes);
app.use('/habits', habitsRoutes);
app.use("/", routes);

// Muestra el link en la consolo para nomas picarle :)
server.listen(port, () => {
  console.log(`Aplicación corriendo en http://localhost:${port}`);
});

server.on("error", (error) => {
  if (error && (error as NodeJS.ErrnoException).code === "EADDRINUSE") {
    console.error(`El puerto ${port} ya está en uso. Cambia PORT en tu .env o finaliza el proceso que ocupa ese puerto.`);
    process.exit(1);
  }
  throw error;
});

export { app, io, server };
