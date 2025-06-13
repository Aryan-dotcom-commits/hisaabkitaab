'use client'

import { ExpensesCategory } from "@prisma/client";
import React, {useEffect, useState} from "react";

export function IncomeForm() {
    const [error, setError] = useState<string | null>('');
    const [incomeCategories, setIncomeCategories] = useState<any[]>([{
        incomeSource: 'Loading...',
    }
    ]);
    const [formData, setFormData] = useState<any[]>([{
        incomeCategory: '',
        amount: 0,
        createAt: new Date(),
    }]);

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const response = await fetch ('/api/userIncome', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',}
                });
                const data = await response.json();
                console.log(data);
                const newData = data.incomeValues.map((value: any) => ({incomeSource: value}))
                console.log(newData);

                setIncomeCategories(
                    newData.length > 0 ? newData : [{incomeSource: 'No income sources available'}]
                );
            } catch (error) {
                setError('Error fetching income categories');
            }
        }
        fetchIncome();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/userIncome', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                setError(data.message || "Error submitting income form");
            } else {
                console.log(data.message || "Income ssaved");
            }

        } catch (error) {
            setError('Error submitting income form');
        }
    }

    console.log("Request for POST to the DB", formData);

    return (
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Income</h2>
            <form className="space-y-4" onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => setFormData({...formData, incomeCategory: e.currentTarget.value})}
                >
                    {incomeCategories.map((category, index) => (
                        <option key={index} value={category.incomeSource}>
                            {category.incomeSource}
                        </option>
                    ))}
                </select>
                
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5000"
                    onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
                    value={formData.amount}
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
    const [expense, setExpense] = useState<any[]>(['Loading...']);
    const [error, setError] = useState<string | null>('');
    const [formData, setFormData] = useState({
        expenseCategory: '',
        amount: 0,
        creaedAt: new Date(),
    });

    
    const addExpense = async (e: React.FormEvent) => {
        console.log("Request for POST to the DB", JSON.stringify({formData}));

        const response = await fetch('/api/userExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log('Data resp',data);
        const newData = data.expenses.map((value: any) => ({expenseCategory: value}));
        console.log('New added data', newData);
        setExpense(
            newData.length > 0 ? newData : [{expenseCategory: "No expenses available"}]
        );
    }

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const response = await fetch('/api/userExpense', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                console.log(data);
                const newData = data.expenses.map((value: any) => ({expenseCategory: value}));
                console.log(newData);
                setExpense(
                    newData.length > 0 ? newData : [{expenseCategory: "No expenses available"}]
                );
            } catch (error) {
                setError('Error fetching expense categories');
            }
        }
        fetchExpense();
    }, [])


    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        addExpense(e);
    }

    return (
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Expense</h2>
            <form className="space-y-4" onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => setFormData({...formData, expenseCategory: e.currentTarget.value})}
                >
                    {expense.map((expenseItem, idx) => (
                        <option key={idx} value={expenseItem.expenseCategory}
                            onChange={(e) => setFormData({...formData, expenseCategory: e.currentTarget.value})}
                        >
                            {expenseItem.expenseCategory}
                        </option>
                    ))}
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2000"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
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