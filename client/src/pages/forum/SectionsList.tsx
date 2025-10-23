import { Link } from "react-router-dom";
// import { sections } from "../../mock/forumData";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import "./ForumStyles.scss";
type Section = {
  id: number;
  title: string;
  topics?: any[];
};
export default function SectionsList() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    api
      .get("/sections")
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Ошибка при загрузке разделов:", err));
  }, []);


  return (
    <div className="forum-page sections-page">
      <h2>Разделы форума</h2>
      <div className="sections-grid">
        {sections.map((s) => (
          <Link key={s.id} to={`/forum/${s.id}`} className="section-card">
            <h3>{s.title}</h3>
            <p>Темы: {s.topics?.length ?? 0}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
