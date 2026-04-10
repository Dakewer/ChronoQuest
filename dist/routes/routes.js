"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// res.send('ok')
router.get("/", (req, res) => {
    // res.send('ok')
    res.render("home");
});
router.get("/login", (req, res) => {
    //res.render("login");
    // res.render("login", { layout: false });
    res.render("login", { layout: "salmon" });
});
router.post("/login", (req, res) => {
    //PENDIENTE
});
router.get("/signin", (req, res) => {
    //res.render("signin");
    res.render("signin", { layout: "salmon" });
});
router.post("/signin", (req, res) => {
});
router.get("/calendar", (req, res) => {
    res.render("calendar");
});
router.get("/profile", (req, res) => {
    res.render("profile");
});
router.get("/clan", (req, res) => {
    res.render("clan");
});
router.get("/add", (req, res) => {
    res.render("add");
});
router.get("/todo", (req, res) => {
    res.render("todo");
});
router.get("/settings", (req, res) => {
    res.render("settings");
});
exports.default = router;
//# sourceMappingURL=routes.js.map