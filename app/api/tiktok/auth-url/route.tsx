import { NextRequest, NextResponse } from "next/server";
import { pargoiClient } from "@/lib/pargoilib";
import { cookies } from "next/headers";
import crypto from "crypto";

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const state = crypto.randomBytes(16).toString("hex");
    const cookieStore = await cookies();
    cookieStore.set("tiktok_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
    });

    const scopes = ["user.info.basic", "video.list", "video.upload", "video.publish"];
    const authorizationUrl = pargoiClient.generateAuthUrl(scopes, state);

    return NextResponse.json({ url: authorizationUrl });
  } catch (error) {
    console.error("Failed to generate auth url:", error);
    return NextResponse.json({ error: "Failed to generate auth url" }, { status: 500 });
  }
}
