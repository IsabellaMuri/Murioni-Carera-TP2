"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const tableRouter_1 = require("./routers/tableRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/tables', tableRouter_1.tableRouter);
app.listen(8000, () => {
    console.log(`App listening on http://localhost:8000`);
});
