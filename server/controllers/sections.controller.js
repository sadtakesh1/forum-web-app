import { prisma } from "../prisma/client.js";

export async function list(req, res) {
  try {
    const sections = await prisma.section.findMany({
      include: {
        topics: true,
      },
      orderBy: {
        id: "asc", // сортировка по ID (в порядке добавления)
      },
    });

    res.json(sections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении разделов" });
  }
}
// Получить конкретный раздел по ID (для названия в TopicsList)
export async function getById(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Некорректный ID раздела" });
    }

    const section = await prisma.section.findUnique({
      where: { id },
      select: { id: true, title: true },
    });

    if (!section) {
      return res.status(404).json({ message: "Раздел не найден" });
    }

    res.json(section);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении раздела" });
  }
}
