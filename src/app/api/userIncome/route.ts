import { IncomeCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse)
{
    try {
        const body = await req.json();
        const { amount, categories} = body;
        if (amount < 0) return NextResponse.json({message: "Cannot have amount less than zero"});

        if (categories.incomeType !== Object.values(IncomeCategory)) return NextResponse.json({message: "Invalid income type"}, {status: 404});

    } catch (error)
    {
        return NextResponse.json({ message: "Error saving income", error });
    }
}