import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { stat } from "fs";

export async function GET(req: NextRequest)
{
    try {
        const users = await prisma.user.findMany();

        if (users.length === 0) return NextResponse.json([]);
        return NextResponse.json(users);
    } catch {
        return NextResponse.json({status: 500, message: "An error occured while fetching the users, please refresh to try again"})
    }
}

export async function POST(req: NextRequest)
{
    try {
        const body = await req.json();
        const { name, email, password } = body;
        
        const existingUsers = await prisma.user.findUnique({ where: {email}});

        if (!email.includes("@")) return NextResponse.json({message: "Please enter a valid email address", status: 400});
        if (password.length < 6) return NextResponse.json({message: "Password must be at least 6 characters long", status: 400});

        if (existingUsers) return NextResponse.json({message: "The user already exists with this mail"});

        const hashedPassword = await bcrypt.hash(password, 10); // hashing the password with bcrypt
        
        const newUser = await prisma.user.create({
            data: {name, email, password: hashedPassword}
        });

        return NextResponse.json({message: "You have been registered sucessfully", userValues: newUser, status: 200});
    } catch (error) {
        return NextResponse.json({status: 500, message: "Server error, please check DB Connection", issues: error }); // this exception is for dev side only
    }
}