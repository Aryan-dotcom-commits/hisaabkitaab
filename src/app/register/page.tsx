"use client"

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const [message, setMessage] = useState("");
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
        password: ""
    });

    const router = useRouter();

    const fetchData = async () => {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValue),
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(data.message);
            if (data.status === 200) {
                router.push("/Login");
                toast.success("Login successful!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
            }
            console.log(data)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchData();
    }

    return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-black">Register</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-black mb-1">
          Name
        </label>
        <input
          type="text"
          value={formValue.name}
          onChange={(e) => setFormValue({...formValue, name: e.target.value})}
          id="name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-black mb-1">
          Email
        </label>
        <input
          type="email"
          value={formValue.email}
          onChange={(e) => setFormValue({...formValue, email: e.target.value})}
          id="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-black mb-1">
          Password
        </label>
        <input
          type="password"
          value={formValue.password}
          onChange={(e) => setFormValue({...formValue, password: e.target.value})}
          id="password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Register
      </button>

      <span className="text-red-700"> {message} </span>
    </form>
  </div>
);

}

