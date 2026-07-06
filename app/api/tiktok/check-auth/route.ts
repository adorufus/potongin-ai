import { NextRequest, NextResponse } from "next/server";
import { getPargoiClient } from "@/lib/pargoilib";
import { cookies } from "next/headers";

export const runtime = 'nodejs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchTikTokUserInfo(client: any, accessToken: string) {
  try {
    const payload = await client.getUserInfo(accessToken);
    if (payload?.data?.user) {
      return {
        username: payload.data.user.username,
        display_name: payload.data.user.display_name,
        avatar_url: payload.data.user.avatar_url,
      };
    }
  } catch (err) {
    console.warn("Failed fetching TikTok user info in check-auth:", (err as Error).message);
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isLogout = searchParams.get("logout") === "true";

    const cookieStore = await cookies();

    if (isLogout) {
      cookieStore.delete("tk_access_token");
      cookieStore.delete("tk_refresh_token");
      cookieStore.delete("tk_expires_at");
      cookieStore.delete("tk_use_sandbox");
      return NextResponse.json({ authenticated: false, logout: true });
    }

    const accessToken = cookieStore.get("tk_access_token")?.value;
    const refreshToken = cookieStore.get("tk_refresh_token")?.value;
    const expiresAtStr = cookieStore.get("tk_expires_at")?.value;
    const useSandbox = cookieStore.get("tk_use_sandbox")?.value === "true";

    if (!accessToken && !refreshToken) {
      return NextResponse.json({ authenticated: false, reason: "No tokens found" });
    }

    const now = Date.now();
    const expiresAt = expiresAtStr ? parseInt(expiresAtStr, 10) : 0;

    // Safety margin of 5 minutes (300,000 ms) before actual expiration
    if (accessToken && expiresAt > now + 300000) {
      const client = getPargoiClient(useSandbox);
      const user = await fetchTikTokUserInfo(client, accessToken);
      return NextResponse.json({ authenticated: true, user });
    }

    // Access token is missing or expired, but we have a refresh token
    if (refreshToken) {
      try {
        const client = getPargoiClient(useSandbox);
        
        // Cast to any to access the dynamically monkey-patched refreshAccessToken method
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenPayload = await (client as any).refreshAccessToken(refreshToken);

        if (!tokenPayload || !tokenPayload.access_token) {
          throw new Error("Invalid token refresh payload returned");
        }

        const newExpiresAt = Date.now() + (tokenPayload.expires_in || 86400) * 1000;

        cookieStore.set("tk_access_token", tokenPayload.access_token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        if (tokenPayload.refresh_token) {
          cookieStore.set("tk_refresh_token", tokenPayload.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 365, // 1 year
          });
        }

        cookieStore.set("tk_expires_at", newExpiresAt.toString(), {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 30,
        });

        const user = await fetchTikTokUserInfo(client, tokenPayload.access_token);

        return NextResponse.json({ authenticated: true, refreshed: true, user });
      } catch (refreshErr: unknown) {
        const err = refreshErr as Error;
        console.error("Token auto-refresh failed:", err.message);
        
        // Clear cookies on failed refresh to prompt a clean login
        cookieStore.delete("tk_access_token");
        cookieStore.delete("tk_refresh_token");
        cookieStore.delete("tk_expires_at");
        cookieStore.delete("tk_use_sandbox");

        return NextResponse.json({ authenticated: false, error: "Refresh token expired or invalid" }, { status: 401 });
      }
    }

    // Access token expired and no refresh token available
    cookieStore.delete("tk_access_token");
    cookieStore.delete("tk_expires_at");
    cookieStore.delete("tk_use_sandbox");
    
    return NextResponse.json({ authenticated: false, reason: "Access token expired and no refresh token found" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Auth check handler exception:", err.message);
    return NextResponse.json({ authenticated: false, error: "Internal server error during auth check" }, { status: 500 });
  }
}
