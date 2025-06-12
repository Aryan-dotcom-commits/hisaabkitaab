import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signInToken } from "@/lib/jwt";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const users = await prisma.user.findUnique({where: {email}});

        if (!users) {
            return NextResponse.json({status: 404, message: "User not found"});
        }
        const passwordMatch = await bcrypt.compare(password, users.password);
        if (!passwordMatch) return NextResponse.json({status: 401, message: "Invalid password"});

        const token = signInToken({id: users.id, email: users.email, name: users.name});

        const response = NextResponse.json({message: "Login successful", user: {id: users.id, email: users.email, name: users.name}});
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error)
    {
        return NextResponse.json({status: 500, message: "An error occurred while logging in, please try again later"});
    }
}