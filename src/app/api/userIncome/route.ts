import { IncomeCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse)
{
    try {
        const body = await req.json();
        console.log(body)
        if (body.amount < 0) return NextResponse.json({message: "Cannot have amount less than zero"});
        if (!Object.values(IncomeCategory).includes(body.incomeCategory)) return NextResponse.json({message: "Invalid income type"}, {status: 404});
        const newData = await prisma.income.create({
            data: {
                amount: parseFloat(body.amount),
                incomeType: body.incomeCategory,
                createdAt: body.createAt,
            }
        });
        return NextResponse.json({ message: "Income saved successfully", data: newData, status: 201 });

    } catch (error)
    {
        return NextResponse.json({ message: "Error saving income", error });
    }
}

export async function GET(req: NextRequest, res: NextResponse)
{
    try {
        const incomeValues = await Object.values(IncomeCategory);
        return NextResponse.json({ incomeValues });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching income categories", error });
    }
}