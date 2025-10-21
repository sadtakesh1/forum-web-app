export function validateBody(req, res, next) {
  // Проверяем, если это создание сообщения — просто пропускаем
  if (req.originalUrl.includes("/messages")) {
    return next();
  }

  const { sectionId, title } = req.body;

  // Проверка раздела
  if (!sectionId || isNaN(sectionId) || Number(sectionId) < 1) {
    return res.status(400).json({ message: "Некорректный sectionId" });
  }

  // Проверка заголовка темы
  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 3 ||
    title.trim().length > 120
  ) {
    return res.status(400).json({ message: "Некорректный title" });
  }

  next();
}
