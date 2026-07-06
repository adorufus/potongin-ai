import { NextRequest, NextResponse } from "next/server";
import { getPargoiClient } from "@/lib/pargoilib";
import { cookies } from "next/headers";

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const errorParam = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    const cookieStore = await cookies();
    const savedState = cookieStore.get('tiktok_oauth_state')?.value;
    const codeVerifier = cookieStore.get('tiktok_oauth_code_verifier')?.value;
    const useSandbox = cookieStore.get('tiktok_oauth_sandbox')?.value === 'true';

    // If TikTok returns an OAuth error (like non_sandbox_target)
    if (errorParam) {
        // Clean up oauth cookies
        cookieStore.delete('tiktok_oauth_state');
        cookieStore.delete('tiktok_oauth_code_verifier');
        cookieStore.delete('tiktok_oauth_sandbox');

        return new NextResponse(
            `<!DOCTYPE html>
            <html>
              <head>
                <title>TikTok Login Error</title>
              </head>
              <body style="background: #020617; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; padding: 24px; box-sizing: border-box;">
                <div style="text-align: center; max-width: 450px; background: rgba(11, 19, 38, 0.6); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 24px; padding: 32px; backdrop-filter: blur(20px); box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                  <div style="width: 56px; height: 56px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 20px;">
                    <span style="font-size: 24px;">⚠️</span>
                  </div>
                  <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 12px; color: white;">TikTok Login Error</h2>
                  <p style="font-size: 13px; color: #cbc3d7; line-height: 1.6; margin: 0 0 24px;">
                    ${errorDescription || 'The authentication process was cancelled or failed.'} (${errorParam})
                  </p>
                  <button onclick="window.close()" style="background: #FE2C55; border: none; color: white; padding: 12px 24px; border-radius: 12px; font-size: 13px; font-weight: bold; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(254, 44, 85, 0.3);">
                    Close Window
                  </button>
                </div>
                <script>
                  if (window.opener) {
                    window.opener.postMessage({ 
                      type: 'OAUTH_AUTH_ERROR', 
                      error: ${JSON.stringify(errorParam)}, 
                      errorDescription: ${JSON.stringify(errorDescription || 'Authentication failed.')} 
                    }, '*');
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
    }

    if (!state || state !== savedState) {
        return NextResponse.json({ error: 'OAuth state security verification failed.' }, { status: 403 });
    }

    if (!code) {
        return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
    }

    try {
        const client = getPargoiClient(useSandbox);
        // @ts-expect-error - we monkey-patched getAccessToken to accept codeVerifier as secondary parameter
        const tokenPayload = await client.getAccessToken(code, codeVerifier);
        cookieStore.set('tk_access_token', tokenPayload.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        cookieStore.delete('tiktok_oauth_state');
        cookieStore.delete('tiktok_oauth_code_verifier');
        cookieStore.delete('tiktok_oauth_sandbox');

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