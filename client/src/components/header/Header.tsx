import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.scss";

export default function Header() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__logo" onClick={() => navigate("/")}>
        Keystation
      </div>

      {isAuth && (
        <nav className="header__nav">
          <Link to="/forum">Форум</Link>
          <Link to="/profile">Профиль</Link>
          <button onClick={handleLogout}>Выйти</button>
        </nav>
      )}
    </header>
  );
}
