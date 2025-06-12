"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [formValue, setFormValue] = useState(
    {
        email: "",
        password: ""
    }
  )
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const router = useRouter();
  const fetchData = async () => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
    });

    console.log(response);

    if (response.ok)
    {
        const data = await response.json();
        console.log(data);
        setMessage(data.message);
        if (data.status === 200)
        {
          router.push("/dashboard");
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formValue.email}
            onChange={(e) => setFormValue({...formValue, email: e.target.value})}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formValue.password}
            onChange={(e) => setFormValue({...formValue, password: e.target.value})}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Login
        </button>

        <span className="text-red-700"> {message} </span>
      </form>
    </div>
  );
};

export default LoginForm;
