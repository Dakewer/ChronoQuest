"use strict";

import express from "express";
import path from "path";

const port = process.env.PORT || 3000;
const app = express();


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.ts"));
});

app.listen(port, () => {
    console.log("http://localhost:" + port);
})
