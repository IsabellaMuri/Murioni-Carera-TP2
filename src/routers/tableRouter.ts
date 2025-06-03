import { Router } from "express"

import { getAllTables, getTableById, createTable } from "../controllers/tableController";

export const tableRouter = Router();

tableRouter.get("/", getAllTables);
tableRouter.get("/:id", getTableById);
tableRouter.post("/", createTable);
//tableRouter.put("/:id", updateStatus);
//tableRouter.delete("/:id", deleteTable);
//tableRouter.get("/", getStatus);

