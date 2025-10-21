import express from "express";
import { list, getById } from "../controllers/sections.controller.js";

const router = express.Router();
// Список всех разделов
router.get("/", list);

// Конкретный раздел по ID
router.get("/:id", getById);

export default router;
