import * as topicsService from "../services/topics.service.js";
import { prisma } from "../prisma/client.js";

export async function listBySection(req, res) {
  try {
    const sectionId = Number(req.params.sectionId);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    if (!Number.isInteger(sectionId) || sectionId <= 0) {
      return res.status(400).json({ message: "Некорректный sectionId" });
    }
    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({ message: "Некорректный параметр page" });
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
      return res.status(400).json({
        message: "Некорректный параметр limit (допустимо 1–50)",
      });
    }

    // получаем темы этой секции
    const [topics, total] = await Promise.all([
      prisma.topic.findMany({
        where: { sectionId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { messages: true } }, // добавляем количество сообщений
          author: { select: { username: true } }, // если нужно показывать автора темы
        },
      }),
      prisma.topic.count({ where: { sectionId } }),
    ]);

    const meta = {
      page,
      limit,
      total,
      hasNext: total > page * limit,
    };

    res.json({ data: topics, meta });
  } catch (err) {
    console.error("Ошибка в listBySection:", err);
    res.status(500).json({ message: "Ошибка при получении тем" });
  }
}
export async function create(req, res) {
  try {
    const { sectionId, title } = req.body;
    const userId = req.user.id;

    const section = await prisma.section.findUnique({
      where: { id: Number(sectionId) },
    });
    if (!section) {
      return res.status(404).json({ message: "Раздел не найден" });
    }

    const topic = await prisma.topic.create({
      data: {
        title: title.trim(),
        sectionId: Number(sectionId),
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        sectionId: true,
      },
    });

    res.status(201).json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
}

export async function getById(req, res) {
  try {
    const topicId = Number(req.params.topicId);
    if (!topicId) {
      return res.status(400).json({ message: "Некорректный topicId" });
    }

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        author: { select: { username: true } },
        sectionId: true,
      },
    });

    if (!topic) {
      return res.status(404).json({ message: "Тема не найдена" });
    }

    res.json(topic);
  } catch (err) {
    console.error("Ошибка при получении темы:", err);
    res.status(500).json({ message: "Ошибка при получении темы" });
  }
}
