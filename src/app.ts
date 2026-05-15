"use strict";
// index principal, pero no soy fan de llamar a las cosas index
// https://drive.google.com/file/d/1aPqWYVzZX_wMz16qbB_6m0hJSwdfTSUy/view
// npm crate vite 
import { config } from "dotenv" // <-- debe que iniciarse antesde de las rutas
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
// app.set("views", "./../views");
app.set("views", path.join(__dirname, "views"))

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
// no sé si se requiera despues uno de js

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

googleAuthMiddlware(app);
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes)

// Muestra el link en la consolo para nomas picarle :)
//app.listen(port, () => {
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

