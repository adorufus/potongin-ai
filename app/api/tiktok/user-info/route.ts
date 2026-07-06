import { NextRequest, NextResponse } from "next/server";
import { getPargoiClient } from "@/lib/pargoilib";
import { cookies } from "next/headers";

export const runtime = 'nodejs';

export async function GET(_req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("tk_access_token")?.value;
    const useSandbox = cookieStore.get("tk_use_sandbox")?.value === "true";

    if (!accessToken) {
      return NextResponse.json({ authenticated: false, error: "Not authenticated" }, { status: 401 });
    }

    try {
      const client = getPargoiClient(useSandbox);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userInfoPayload = await (client as any).getUserInfo(accessToken);

      if (userInfoPayload && userInfoPayload.data && userInfoPayload.data.user) {
        const user = userInfoPayload.data.user;
        return NextResponse.json({
          authenticated: true,
          username: user.username,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
        });
      }

      throw new Error("Invalid payload structure from TikTok API");
    } catch (err: unknown) {
      const errorMsg = (err as Error).message;
      console.warn("Failed fetching TikTok API user info, returning fallback details:", errorMsg);
      
      // Return standard offline/sandbox mock details if API is unavailable or has invalid tokens
      return NextResponse.json({
        authenticated: true,
        username: "potongin_creator",
        display_name: "Potongin Creator",
        avatar_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqCeJBl-q00DpbWH7Ga7qsytrMS9QliGNlHqn_pPlmmD3coz7lehjW4IltWTUN3rvVi-OpKkYrWxWz5iqZsZRxL2-8KTqHkCgP-bmnMpeEgxZkr547m4UewGtikpDSnp2y9fMOvb9z5i8D41jnaFgLSkA1TbJMqhTkeKvV0BxrCrxvHCC5hJ3uQWikDUYq84fTO0EQRdtEyXgUhSzKoF3KxSSsC_ZIi3nVP1BY-VoJlYV_tBhpoFelYqZWd0vb6tnw7mxUUN9223Vr",
        is_fallback: true,
      });
    }
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
