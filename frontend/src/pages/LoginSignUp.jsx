import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./CSS/LoginSignUp.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === "Login") {
        if (!formData.email || !formData.password) {
          toast.error("Please fill in all fields");
          return;
        }
        await login(formData.email, formData.password);
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          toast.error("Please fill in all fields");
          return;
        }
        await register(formData.name, formData.email, formData.password);
      }
    } catch (error) {
      console.error(`Error during ${state}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <div className="loginsignup-fields">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required={state === "Sign Up"}
              />
            </div>
          )}
          <div className="loginsignup-fields">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginsignup-fields">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : state}
          </button>
        </form>
        <p className="loginsignup-login">
          {state === "Login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
