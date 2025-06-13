import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const getCookies = cookies();
    const token = (await getCookies).get("token")?.value;
    if (!token) return NextResponse.json({ status: 401, message: "Unauthorized" });

    const user = verifyToken(token) as { userId: string } | null;
    if (!user || !user.userId) return NextResponse.json({ status: 401, message: "Invalid Token" });

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: user.userId,
            }
        });

        return NextResponse.json({ transactions }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching user transactions", error }, { status: 500 });
    }
}