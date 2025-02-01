import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Sidebar/Login/Login";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendURL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        style={{
          top: "5rem",
        }}
      />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <BrowserRouter>
          <Navbar setToken={setToken} />
          <div className="app-container">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<List token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
