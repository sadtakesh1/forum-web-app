import { Link } from "react-router-dom";
import "./Home.scss";

import welcomeImage from "../../assets/welcome-image.png";

function Home() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <div className="home-page">
      <div className="home-actions">
        <img src={welcomeImage} alt="Welcome cat" className="home-image" />
        <div className="home-container">
          {isLoggedIn ? (
            <>
              <Link to="/forum" className="btn">
                Перейти в форум
              </Link>
              <Link to="/profile" className="btn secondary">
                Профиль
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Войти
              </Link>
              <Link to="/register" className="btn secondary">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
