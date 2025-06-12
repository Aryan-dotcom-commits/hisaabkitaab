'use client'

import React, { useState, useEffect } from "react";

export function IncomeForm() {
    return (
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Income</h2>
            <form className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Salary, Freelance"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5000"
                />
                </div>
                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                Add Income
                </button>
            </form>
        </section>
    );
}

export function ExpenseForm() {
    return (
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Expense</h2>
            <form className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rent, Groceries"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2000"
                />
                </div>
                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                Add Expense
                </button>
            </form>
        </section>
    );
}