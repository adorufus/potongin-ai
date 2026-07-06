import { NextRequest, NextResponse } from "next/server";
import { getPargoiClient } from "@/lib/pargoilib";
import { cookies } from "next/headers";
import crypto from "crypto";

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sandboxParam = searchParams.get("sandbox");

    let useSandbox = false;
    if (sandboxParam === "true") {
      useSandbox = true;
    } else if (sandboxParam === "false") {
      useSandbox = false;
    } else {
      useSandbox = process.env.TIKTOK_USE_SANDBOX === "true";
    }

    const state = crypto.randomBytes(16).toString("hex");
    const code_verifier = crypto.randomBytes(32).toString("base64url");
    const code_challenge = crypto.createHash("sha256").update(code_verifier).digest().toString("base64url");

    const cookieStore = await cookies();
    cookieStore.set("tiktok_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
    });

    cookieStore.set("tiktok_oauth_code_verifier", code_verifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
    });

    cookieStore.set("tiktok_oauth_sandbox", useSandbox ? "true" : "false", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
    });

    const scopes = ["user.info.basic", "video.upload", "video.publish"];
    const client = getPargoiClient(useSandbox);
    let authorizationUrl = client.generateAuthUrl(scopes, state);
    authorizationUrl += `&code_challenge=${code_challenge}&code_challenge_method=S256`;

    return NextResponse.json({ url: authorizationUrl });
  } catch (error) {
    console.error("Failed to generate auth url:", error);
    return NextResponse.json({ error: "Failed to generate auth url" }, { status: 500 });
  }
}
