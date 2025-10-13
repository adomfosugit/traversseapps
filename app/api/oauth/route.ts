// src/app/oauth/route.js
import { createAdminClient } from "@/lib/Appwrite/Config";
import { NextResponse } from "next/server";

export async function GET(request) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  // Create a response and set the cookie on it
  const response = NextResponse.redirect(`${request.nextUrl.origin}/home`);
  response.cookies.set({
    name: "appwrite-session",
    value: session.secret,
    httpOnly: true,
    sameSite: "strict",
    secure: true, // keep true in production (HTTPS)
    path: "/",
  });

  return response;
}
