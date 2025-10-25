# 🧩 Forum Web App
**Forum Web App** — это веб-приложение форума, построенное на **React + Vite** (клиент) и **Node.js + Express + Prisma + PostgreSQL** (сервер).
Позволяет пользователям регистрироваться, писать сообщения и общаться в разных разделах форума.

👉 [Открыть сайт](https://forum-web-app-iota.vercel.app/)

---

## 🚀 Основные фичи

- 🔑 Регистрация и авторизация (JWT + bcrypt)
- 🧭 Разделы форума с темами
- 💬 Просмотр и создание сообщений
- 📄 Пагинация (skip / take через Prisma)
- 🧱 Чистая структура кода: контроллеры, сервисы, роуты
- 📦 Docker-окружение для базы данных
- 🧠 Prisma ORM для работы с PostgreSQL
- ⚡ Быстрая сборка фронтенда через Vite
- 🎨 Адаптивная верстка для десктопа и мобильных устройств

---

## 🛠 Технологии

### Клиент
- **React** — библиотека для интерфейсов
- **Vite** — сборщик и dev-сервер
- **Axios** — работа с API
- **SCSS** — стилизация компонентов
- **React Router** — маршрутизация страниц

### Сервер
- **Node.js + Express** — REST API
- **Prisma ORM** — работа с PostgreSQL
- **PostgreSQL** — база данных
- **JWT** — аутентификация
- **bcrypt** — хеширование паролей
- **Docker Compose** — контейнеризация БД

---

## 📦 Установка и запуск

### 🔹 Клонируем проект
```bash
git clone https://github.com/sadtakesh1/forum-web-app.git
cd forum-web-app
```

### 🔹 Установка зависимостей
#### Клиент:
```bash
cd client
npm install
npm run dev
```

#### Сервер:
```bash
cd server
npm install
npx prisma generate
npm run dev
```

---

## 🧩 Структура проекта

```
forum-web-app/
├─ client/                        # фронтенд (React + TypeScript + Vite)
│  ├─ src/
│  │  ├─ api/                     # настройки Axios
│  │  ├─ assets/                  # изображения и логотипы
│  │  ├─ components/              # переиспользуемые UI-компоненты
│  │  ├─ mock/                    # временные данные для тестов
│  │  ├─ pages/                   # страницы (auth, forum, home, profile)
│  │  ├─ styles/                  # SCSS-модули и переменные
│  │  ├─ App.tsx / main.tsx       # корневой компонент и точка входа
│  │  └─ App.css / main.scss      # глобальные стили
│  ├─ vite.config.ts              # конфигурация Vite
│  ├─ tsconfig*.json              # конфиги TypeScript
│  ├─ eslint.config.js            # правила линтинга
│  ├─ vercel.json                 # настройки деплоя
│  └─ package.json                # зависимости клиента
│
└─ server/                        # бэкенд (Express + Prisma + PostgreSQL)
   ├─ controllers/                # контроллеры API (auth, topics, messages)
   ├─ middlewares/                # JWT-проверки и валидация тела запроса
   ├─ prisma/                     # конфигурация и миграции Prisma
   ├─ routes/                     # маршруты Express
   ├─ services/                   # бизнес-логика (работа с БД)
   ├─ docker-compose.yml          # контейнер PostgreSQL
   ├─ index.js                    # точка входа сервера
   ├─ .env                        # переменные окружения
   └─ package.json                # зависимости сервера

# корневой README проекта
README.md
```

---

## ⚙️ Переменные окружения

Создание файла `.env` в папке `server/` со следующими ключами:

```
DATABASE_URL="postgresql://user:password@localhost:5432/forum_db"
JWT_SECRET="your_jwt_secret"
```

---

## 💡 Полезные команды

```bash
npx prisma migrate dev     # применить миграции
npx prisma studio          # открыть визуальную БД
npm run dev                # запуск сервера (Express)
npm run build              # билд клиента
```

---


