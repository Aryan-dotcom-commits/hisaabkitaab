import { NextRequest, NextResponse } from "next/server";
import { ExpensesCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, res: NextResponse)
{
    try {
        const expenses = await Object.values(ExpensesCategory);
        return NextResponse.json({ expenses });
    } catch (error) {
        return NextResponse.json({message: "Error fetching user expenses", error});
    }
}

export async function POST(req: NextRequest, res: NextResponse)
{
    try {
        const body = await req.json();
        console.log(body);
        const {amount, expenseCategory} = body;
        
        // if (body.amount < 0) return NextResponse.json({message: "More than zero amount"}, {status: 400});
          if (parseInt(amount) < 0) return NextResponse.json({message: "More than zero amount"}, {status: 400});
        console.log(body.expenseCategory);
        if (!Object.values(ExpensesCategory).includes(body.expenseCategory)) return NextResponse.json({message: "Invalid expense type"}, {status: 400})
        const newExpense = await prisma.expense.create({
            // data: {
            //     amount:parseFloat(body.amount),
            //     expenseType: body.expenseCategory,
            //     createdAt: body.createAt,
            // }
              data: {
                amount:parseInt(amount),
                expenseType: expenseCategory,
                createdAt: body.createAt,
            }
        });

        console.log('Expense Created 201',newExpense);
        
        return NextResponse.json({ message: "User expenses saved successfully", expenses: newExpense, status: 201 });
    } catch (error) {
        return NextResponse.json({message: 'Error saving user expenses', error})
    }
}