import { useParams, Link, useNavigate } from "react-router-dom";
// import { topics } from "../../mock/forumData";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import "./ForumStyles.scss";

type Topic = {
  id: number;
  title: string;
  _count?: { messages: number };
  author?: { username: string };
};

export default function TopicsList() {
  const [loading, setLoading] = useState(true);
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const [sectionTitle, setSectionTitle] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  
  useEffect(() => {
    async function fetchTopics() {
      try {
        // Получаем список тем
        const res = await api.get(
          `/topics/${sectionId}`
        );
        setTopics(res.data.data || []);

        // Получаем сам раздел по ID
        const sectionRes = await api.get(
          `/sections/${sectionId}`
        );
        setSectionTitle(sectionRes.data.title || "Без названия");
      } catch (err) {
        console.error("Ошибка при загрузке тем:", err);
      } finally {
        setLoading(false);;
      }
    }

    fetchTopics();
  }, [sectionId]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Загрузка тем...</p>;
  }

  return (
    <div className="forum-page topics-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/forum")}>
          ← Назад
        </button>
        <h2>Темы раздела: {sectionTitle}</h2>
      </div>

      <div className="topics-list">
        {topics.length === 0 ? (
          <p>Тем пока нет.</p>
        ) : (
          topics.map((t) => (
            <Link key={t.id} to={`/topic/${t.id}`} className="topic-card">
              <div className="topic-header">
                <h3>{t.title}</h3>
              </div>
              <div className="topic-info">
                <span>Сообщений: {t._count?.messages ?? 0}</span>
                <span>Автор: {t.author?.username || "Неизвестен"}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
