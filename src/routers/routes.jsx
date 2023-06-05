import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { Login } from "../components/Login/Login";
import { SignUp } from "../components/SignUp/SignUp";
import { auth } from "../firebase";

export function MyRoutes() {
  const [userName, setUserName] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home name={userName} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
