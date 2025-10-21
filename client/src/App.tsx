import "./styles/main.scss";
import { Routes, Route, useLocation } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SectionsList from "./pages/forum/SectionsList";
import TopicsList from "./pages/forum/TopicsList";
import MessagesList from "./pages/forum/MessagesList";
import Profile from "./pages/profile/Profile";

function App() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forum" element={<SectionsList />} />
        <Route path="/forum/:sectionId" element={<TopicsList />} />
        <Route path="/topic/:topicId" element={<MessagesList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
