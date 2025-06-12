'use client'

import React, { useState, useEffect } from "react";

const UserProfile = () => {
    const [userData, setUserData] = useState<any[]>([
        {
            name: "Loading...",
            email: "Loading..."
        }
    ]);

    const [tokenExists, setTokenExists] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();

                setUserData([
                    {
                        name: data.user.name || "No Name Provided",
                        email: data.user.email || "No Email Provided",
                    }
                ]);
                localStorage.setItem("token", data.token);
                console.log(data.token);
                setTokenExists(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
            };

            if (typeof window !== "undefined")
            {
                const token = localStorage.getItem("token");
                if (token) setTokenExists(true);
            }
        };

        fetchUserData();
    }, []);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 text-gray-800 p-4">
            <h1 className="text-4xl font-extrabold mb-8">
                {tokenExists
                    ? "User Profile"
                    : "Please Login to View Your Profile"}
            </h1>

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-4 transition-all duration-300 hover:scale-105">
                {userData.map((user, index) => (
                    <div key={index} className="space-y-2">
                        <div className="text-lg font-medium text-gray-600">Name</div>
                        <div className="text-2xl font-bold text-purple-800">{user.name}</div>

                        <div className="text-lg font-medium text-gray-600">Email</div>
                        <div className="text-xl font-semibold text-pink-600">{user.email}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UserProfile;
