import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {

    try {

      const res = await axios.post(
        "hhttps://task-manager-app-production-2339.up.railway.app/signup",
        form
      );

      alert(res.data.message);

      if (res.data.message === "Signup successful") {
        navigate("/");
      }

    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-[350px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
            onClick={handleSignup}
            className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700"
          >
            Sign Up
          </button>

          <p className="text-center">
            Already have an account?

            <Link
              to="/"
              className="text-blue-600 ml-1"
            >
              Login
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;