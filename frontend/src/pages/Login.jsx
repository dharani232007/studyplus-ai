import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { toast }
from "react-toastify";

import { loginUser }
from "../api/authApi";

import { useAuth }
from "../context/AuthContext";

import "../styles/auth.css";

export default function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [loading,setLoading] =
    useState(false);

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
      await loginUser({

        email,
        password

      });

      login(data);

      toast.success(
        "Login Successful"
      );

      navigate("/dashboard");

    } catch(error){

      toast.error(

        error.response?.data?.message ||
        "Login Failed"

      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
        >
          {
            loading
            ? "Loading..."
            : "Login"
          }
        </button>

      </form>

    </div>

  );
}