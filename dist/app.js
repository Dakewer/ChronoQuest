"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index principal, pero no soy fan de llamar a las cosas index
const dotenv_1 = require("dotenv"); // <-- debe que iniciarse antesde de las rutas
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes/routes"));
const express_handlebars_1 = require("express-handlebars");
const index_1 = require("./dataBase/index");
const port = process.env.PORT || 3005;
const app = (0, express_1.default)();
(0, index_1.connectDB)();
// Configuración de handlebars
app.engine("handlebars", (0, express_handlebars_1.engine)());
app.set("view engine", "handlebars");
// app.set("views", "./../views");
app.set("views", path_1.default.join(__dirname, "views"));
// Archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use('/css', express_1.default.static(path_1.default.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express_1.default.static(path_1.default.join(__dirname, '../node_modules/bootstrap/dist/js')));
// no sé si se requiera despues uno de js
app.use("/", routes_1.default);
// Muestra el link en la consolo para nomas picarle :)
app.listen(port, () => {
    console.log(`Aplicación corriendo en http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map