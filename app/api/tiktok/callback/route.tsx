import { NextRequest, NextResponse } from "next/server";
import { pargoiClient } from "@/lib/pargoilib";
import { cookies } from "next/headers";

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    const cookieStore = await cookies();
    const savedState = cookieStore.get('tiktok_oauth_state')?.value;

    if (!state || state !== savedState) {
        return NextResponse.json({ error: 'OAuth state security verification failed.' }, { status: 403 });
    }

    if (!code) {
        return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
    }

    try {
        const tokenPayload = await pargoiClient.getAccessToken(code);
        cookieStore.set('tk_access_token', tokenPayload.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        cookieStore.delete('tiktok_oauth_state');

        return new NextResponse(
            `<!DOCTYPE html>
            <html>
              <head>
                <title>Authenticating...</title>
              </head>
              <body style="background: #020617; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                <div style="text-align: center;">
                  <div style="width: 40px; height: 40px; border: 3px solid rgba(208, 188, 255, 0.3); border-top-color: #d0bcff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
                  <p style="font-size: 14px; font-weight: 500;">Connection successful. Completing login...</p>
                </div>
                <style>
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                </style>
                <script>
                  try {
                    localStorage.setItem('tk_access_token', 'true');
                    localStorage.setItem('potongin_user_name', 'TikTok Creator');
                  } catch (e) {
                    console.error('Failed to write to localStorage:', e);
                  }
                  
                  if (window.opener) {
                    window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                    window.close();
                  } else {
                    window.location.href = '/dashboard';
                  }
                </script>
              </body>
            </html>`,
            {
              headers: {
                "Content-Type": "text/html; charset=utf-8",
              },
            }
        );
    } catch (error: unknown) {
        const err = error as { response?: { data?: unknown }; message?: string };
        console.error('Handshake verification failed:', err.response?.data || err.message);
        return NextResponse.json({ error: 'Failed to obtain access token' }, { status: 500 });
    }
}