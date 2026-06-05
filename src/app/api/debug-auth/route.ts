import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const h = await headers();
  
  // Check env vars (masked for security)
  const hasSecret = !!process.env.BETTER_AUTH_SECRET;
  const secretLength = process.env.BETTER_AUTH_SECRET?.length || 0;
  const authUrl = process.env.BETTER_AUTH_URL || "(not set)";
  const nodeEnv = process.env.NODE_ENV || "(not set)";
  
  // Check session
  let sessionInfo = null;
  try {
    const session = await auth.api.getSession({ headers: h });
    sessionInfo = session ? { 
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name
    } : null;
  } catch (err: any) {
    sessionInfo = { error: err.message };
  }

  // Check cookies received
  const cookieHeader = h.get("cookie") || "(no cookies)";
  const hasBetterAuthCookie = cookieHeader.includes("better-auth");
  const hasSecureCookie = cookieHeader.includes("__Secure-better-auth");

  return NextResponse.json({
    env: {
      BETTER_AUTH_SECRET: hasSecret ? `set (${secretLength} chars)` : "NOT SET ⚠️",
      BETTER_AUTH_URL: authUrl,
      NODE_ENV: nodeEnv,
    },
    cookies: {
      hasBetterAuthCookie,
      hasSecureCookie,
      rawCookieNames: cookieHeader.split(";").map(c => c.trim().split("=")[0]),
    },
    session: sessionInfo,
  });
}
