import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

const COOKIE = "token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 din

// Login howar por: session theke JWT bani, HTTPOnly cookie te rakhi
export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    const res = NextResponse.json({ message: "Not logged in" }, { status: 401 });
    res.cookies.delete(COOKIE);
    return res;
  }

  const token = jwt.sign(
    { email: session.user.email, name: session.user.name },
    process.env.JWT_SECRET as string,
    { expiresIn: MAX_AGE }
  );

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}

// Logout e cookie muche dei
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE);
  return res;
}