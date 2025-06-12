import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET() {
    const getCookies = cookies();
    const token = (await getCookies).get("token")?.value;

    if (!token) return NextResponse.json({ status: 401, message: "Unauthorized" });

    const user = verifyToken(token);
    if (!user) return NextResponse.json({ status: 401, message: "Invalid Token" });

    return NextResponse.json({user, token}, {status: 200});
}