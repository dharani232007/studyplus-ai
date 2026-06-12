import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { signupUser }
from "../api/authApi";

import { toast }
from "react-toastify";

import "../styles/auth.css";

export default function Signup() {

  const navigate =
    useNavigate();

  const [name,setName] =
    useState("");

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

      await signupUser({

        name,
        email,
        password

      });

      toast.success(
        "Signup Successful"
      );

      navigate("/login");

    } catch(error){

      toast.error(

        error.response?.data?.message ||
        "Signup Failed"

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

        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>
            setName(
              e.target.value
            )
          }
        />

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
            : "Signup"
          }
        </button>

      </form>

    </div>

  );
}