import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { backendURL } from "../../../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendURL + "/api/user/admin", {
        email,
        password,
      });
      if (response.data && response.data.token) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="AdminLogin">
      <div className="AdminLogin-container">
        <h1>Admin Login</h1>
        <form onSubmit={onSubmitHandler} className="AdminLogin-fields">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Admin Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
