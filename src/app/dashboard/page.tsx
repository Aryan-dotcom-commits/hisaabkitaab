"use client";

import React, {useEffect} from "react";
import {IncomeForm, ExpenseForm }from "@/components/TransactionForms";

const Dashboard = () => {
  const [displayForm, setDisplayForm] = React.useState(<></>);


  const clickForm = (e: any) => {
    if (e.target.value === "Income") 
    {
      setDisplayForm(<IncomeForm />);
    }

    if (e.target.value === "Expense")
    {
      setDisplayForm(<ExpenseForm />);
    }

    if (e.target.value === "View") 
    {
      setDisplayForm(<div className="text-gray-600">Transaction viewing functionality will be implemented here.</div>);
    }
  }

  useEffect(() => {
    const fetchTransactions = async() => {
      const response = await fetch('/api/userTransaction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        
      })
      const body = await response.json();
      console.log(body);
    }

    fetchTransactions();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Your Financial Dashboard</h1>
      <p className="text-base mb-6 text-gray-600">
        Here you can manage your income, expenses, and track your financial goals.
      </p>
      <div className="flex flex-wrap gap-4">
        <button className="bg-gray-800 text-white px-5 py-2 rounded-md shadow hover:bg-gray-700 transition"
          value={"View"}
          onClick={clickForm}
        >
          View Transactions
        </button>
        <button
          className="bg-green-600 text-white px-5 py-2 rounded-md shadow hover:bg-green-700 transition"
          value="Income"
          onClick={clickForm}
        >
          Add Income
        </button>
        <button
          className="bg-red-600 text-white px-5 py-2 rounded-md shadow hover:bg-red-700 transition"
          value="Expense"
          onClick={clickForm}
        >
          Add Expense
        </button>
      </div>

    <div className="mt-8 w-full max-w-xl">{displayForm}</div>
  </section>

  );
};

export default Dashboard;
