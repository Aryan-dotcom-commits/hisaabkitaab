'use client'

import React, { useState, useEffect } from "react";

export default function TransactionPage() {
    const [incomeForm, setIncomeForm] = useState(false);
    const [expenseForm, setExpenseForm] = useState(false);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 text-gray-800 p-4">
            <h1 className="text-4xl font-extrabold mb-8">
                Add Your Transactions
            </h1>

            
        </section>
    );
}