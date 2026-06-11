import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await aaxios.post(
  "https://task-manager-app-production-2339.up.railway.app/login",
  form
);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[350px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-center">
            Don’t have an account?
            <Link to="/signup" className="text-blue-600 ml-1">
              Signup
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;