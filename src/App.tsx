import React, { useEffect } from "react";
import logo from "./logo.svg";
import SidebarLayout from "./components/sidebar/sidebarLayout";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/home";
import Notes from "./components/Notes/notes";
import Fav from "./components/Favorites/fav";
import UserSettings from "./components/Settings/userSettings";
import SystemSettings from "./components/Settings/systemSettings";
import Register from "./components/Register/register";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index path="home" element={<Home />} />
          <Route path="notes/*" element={<Notes />} />
          <Route path="favorites/*" element={<Fav />} />
          <Route path="userSettings/*" element={<UserSettings />} />
          <Route path="systemSettings/*" element={<SystemSettings />} />
          <Route path="register/*" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
