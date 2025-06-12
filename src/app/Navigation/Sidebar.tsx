"use client"

import React, { useState } from "react";

export default function Sidebar()
{
    return (
        <section className="w-64 h-full bg-gray-800 text-white fixed top-0 left-0">
            <div className="p-4">
                <h2 className="text-xl font-bold">Finance App</h2>
            </div>
            <nav className="mt-4">
                <ul className="space-y-2">
                    <li>
                        <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</a>
                    </li>
                    <li>
                        <a href="/transactions" className="block px-4 py-2 hover:bg-gray-700">Transactions</a>
                    </li>
                    <li>
                        <a href="/profile" className="block px-4 py-2 hover:bg-gray-700"> Profile </a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}
