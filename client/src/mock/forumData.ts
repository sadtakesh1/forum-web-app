// Разделы (категории форума)
export const sections = [
  { id: 1, title: "Клавиатуры" },
  { id: 2, title: "Мыши" },
  { id: 3, title: "Аксессуары" },
];

// Темы (внутри разделов)
export const topics = [
  { id: 1, sectionId: 1, title: "Обсуждение моделей", messagesCount: 23 },
  { id: 2, sectionId: 1, title: "Смазка свитчей", messagesCount: 12 },
  { id: 3, sectionId: 2, title: "Выбор сенсора", messagesCount: 5 },
];

// Сообщения (внутри темы)

export const messages = [
  { id: 1, topicId: 1, author: { username: "User1" }, body: "Привет!" },
  { id: 2, topicId: 1, author: { username: "User2" }, body: "Как дела?" },
  {
    id: 3,
    topicId: 2,
    author: { username: "User3" },
    body: "Я использую Krytox 205g0.",
  },
];
