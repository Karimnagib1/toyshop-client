import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "./UserSlice";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const myNav = document.getElementById("mynav");
    myNav.classList.add("nav-colored");
    myNav.classList.remove("nav-transparent");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    const jsonResponse = await fetch("https://toyshop-ekqp.onrender.com/api/users/login", {
      method: "POST",
      body: data,
    });
    const response = await jsonResponse.json();
    if (response.success) {
      axios.defaults.headers.common = { Authorization: response.token };
      const payload = JSON.parse(window.atob(response.token.split(".")[1]));
      dispatch(authUser(payload));
      navigate("/");
    }
  };

  return (
    <div className="content-wrap">
      <div className="login-c">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            id="email"
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>

          <input
            placeholder="Enter your password"
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
