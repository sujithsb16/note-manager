import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNote from "./screens/CreateNote/CreateNote";
import UpdateNote from "./screens/UpdateNote/UpdateNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import AdminLandingPage from "./screens/AdminLandingPage/AdminLandingPage";
import UpdateUser from "./screens/UpdateUser/UpdateUser";



const App = () => {
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [admin, setAdmin] = useState(false);
  return (
    <BrowserRouter>
      <Header
        setSearch={setSearch}
        setUserSearch={setUserSearch}
        setAdmin={setAdmin}
        admin={admin}
      />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="mynotes" element={<MyNotes search={search} />} />
          <Route path="createnote" element={<CreateNote />} />
          <Route path="note/:id" element={<UpdateNote />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route
            path="admin"
            element={
              <AdminLandingPage userSearch={userSearch} setAdmin={setAdmin} />
            }
          />
          <Route
            path="admin/user/:id"
            element={<UpdateUser setAdmin={setAdmin} />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
