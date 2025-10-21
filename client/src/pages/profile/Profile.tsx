import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

interface UserData {
  email: string;
  username: string;
  createdAt: string;
  topicsCount?: number;
  messagesCount?: number;
}

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        setError("Не удалось получить данные пользователя");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p className="loading">Загрузка...</p>;

  return (
    <div className="profile-page">
      <h2>Профиль пользователя</h2>

      <div className="profile-card">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Имя пользователя:</strong> {user.username}
        </p>
        <p>
          <strong>Дата регистрации:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Тем создано:</strong> {user.topicsCount ?? 0}
        </p>
        <p>
          <strong>Сообщений:</strong> {user.messagesCount ?? 0}
        </p>
      </div>

      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
