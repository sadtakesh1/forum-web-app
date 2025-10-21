import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  try {
    //Получаем заголовок
    const header = req.headers.authorization;

    //Проверяем наличие и формат
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Нет или неверный токен" });
    }

    //Достаём сам токен
    const token = header.split(" ")[1];

    //Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Сохраняем данные пользователя в req.user
    req.user = { id: decoded.id, email: decoded.email };

    //Передаём управление следующему обработчику
    next();

  } catch (error) {
    console.error("Ошибка при проверке токена:", error.message);
    return res.status(401).json({ message: "Неверный или истёкший токен" });
  }
}
