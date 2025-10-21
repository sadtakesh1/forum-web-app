import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ForumStyles.scss";

// тип сообщения
type Message = {
  id: number;
  topicId: number;
  body: string;
  author: { username: string } | null;
  createdAt?: string;
};

export default function MessagesList() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [topicTitle, setTopicTitle] = useState("Загрузка...");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    async function fetchData() {
      try {
        // загружаем сообщения
        const messagesRes = await axios.get(
          `http://localhost:5000/topics/${topicId}/messages`
        );
        setMessages(messagesRes.data);

        // загружаем тему
        const topicRes = await axios.get(
          `http://localhost:5000/topics/id/${topicId}`
        );

        if (topicRes.data?.title) {
          setTopicTitle(topicRes.data.title);
        } else {
          setTopicTitle("Без названия");
        }
      } catch (err: any) {
        console.error("Ошибка при загрузке:", err);
        if (err.response?.status === 404) {
          setTopicTitle("Тема не найдена");
        } else {
          setTopicTitle("Ошибка загрузки темы");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [topicId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/topics/${topicId}/messages`,
        { body: newMessage },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Ошибка при отправке сообщения:", err);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Загрузка...</p>;
  }

  return (
    <div className="forum-page messages-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <h2>{topicTitle}</h2>
      </div>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p style={{ color: "#888" }}>Пока нет сообщений.</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="message-card">
              <div className="message-header">
                <span className="author">{m.author?.username || "Аноним"}</span>
                <span className="date">
                  {m.createdAt
                    ? new Date(m.createdAt).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
              <div className="message-body">{m.body}</div>
            </div>
          ))
        )}
      </div>

      {isLoggedIn ? (
        <div className="new-message">
          <textarea
            placeholder="Написать сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSend}>Отправить</button>
        </div>
      ) : (
        <p className="login-hint">
          Чтобы написать сообщение, войдите в аккаунт
        </p>
      )}
    </div>
  );
}
