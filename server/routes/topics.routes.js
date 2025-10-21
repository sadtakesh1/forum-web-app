import express from "express";
import { auth } from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as topicsController from "../controllers/topics.controller.js";
import * as messagesController from "../controllers/messages.controller.js";

const router = express.Router();

// Сообщения внутри темы 
// эти роуты должны идти ПЕРЕД ":sectionId"
router.get("/:topicId/messages", messagesController.getByTopic);
router.post(
  "/:topicId/messages",
  auth,
  validateBody,
  messagesController.create
);

// Получить тему по ID (для названия) 
router.get("/id/:topicId", topicsController.getById);

// router.post("/:topicId/messages", auth, messagesController.create);

// Темы 
router.get("/:sectionId", topicsController.listBySection);
router.post("/", auth, validateBody, topicsController.create);
export default router;
