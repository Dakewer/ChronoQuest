"use strict";
// index principal, pero no soy fan de llamar a las cosas index

import express from "express";
import path from "path";
import routes from "./routes";

const port = process.env.PORT || 3000;
const app = express();

app.use("/", routes)

// Muestra el link en la consolo para nomas picarle :)
app.listen(port, () => {
    console.log("http://localhost:" + port);
})
