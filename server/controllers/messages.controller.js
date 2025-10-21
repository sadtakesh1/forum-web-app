import { prisma } from "../prisma/client.js";

export async function getByTopic(req, res) {
  try {
    const topicId = Number(req.params.topicId);

    if (!topicId || isNaN(topicId)) {
      return res.status(400).json({ message: "Некорректный topicId" });
    }

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      return res.status(404).json({ message: "Тема не найдена" });
    }

    const messages = await prisma.message.findMany({
      where: { topicId },
      include: {
        author: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    res.json(messages);
  } catch (err) {
    console.error("Ошибка при получении сообщений:", err);
    res.status(500).json({ message: "Ошибка при получении сообщений" });
  }
}

export async function create(req, res) {
  try {
    const topicId = Number(req.params.topicId);
    const { body } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Неавторизован" });
    }
    if (!body || !body.trim()) {
      return res
        .status(400)
        .json({ message: "Сообщение не может быть пустым" });
    }

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      return res.status(404).json({ message: "Тема не найдена" });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: body.trim(),
        topicId,
        authorId: userId,
      },
      include: {
        author: { select: { id: true, username: true } },
      },
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Ошибка при создании сообщения:", err);
    res.status(500).json({ message: "Ошибка при создании сообщения" });
  }
}
