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

        return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch (error: unknown) {
        const err = error as { response?: { data?: unknown }; message?: string };
        console.error('Handshake verification failed:', err.response?.data || err.message);
        return NextResponse.json({ error: 'Failed to obtain access token' }, { status: 500 });
    }
}