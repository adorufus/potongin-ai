import {TikTokClient} from "pargoi";

export function getPargoiClient(useSandboxOverride?: boolean) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY || "dummy_key";
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET || "dummy_secret";
  const redirectUri = process.env.TIKTOK_REDIRECT_URI || "http://localhost:3000/api/tiktok/callback";

  // Sandbox or production selection (defaults to false / production mode first, unless env is explicitly 'true')
  const useSandbox = useSandboxOverride !== undefined 
    ? useSandboxOverride 
    : process.env.TIKTOK_USE_SANDBOX === "true";

  const sandboxApiBase = process.env.TIKTOK_SANDBOX_API_BASE || "https://open-sandbox.tiktokapis.com/v2";
  const prodApiBase = process.env.TIKTOK_PROD_API_BASE || "https://open.tiktokapis.com/v2";

  const sandboxAuthBase = process.env.TIKTOK_SANDBOX_AUTH_BASE || "https://www.tiktok.com/v2/auth/authorize/";
  const prodAuthBase = process.env.TIKTOK_PROD_AUTH_BASE || "https://www.tiktok.com/v2/auth/authorize/";

  const activeApiBase = useSandbox ? sandboxApiBase : prodApiBase;
  const activeAuthBase = useSandbox ? sandboxAuthBase : prodAuthBase;

  const client = new TikTokClient({
    clientKey,
    clientSecret,
    redirectUri,
  });

  // Dynamically inject the active API base URL onto the client instance
  // @ts-expect-error - baseUrl is not in the public declaration but used at runtime
  client.baseUrl = activeApiBase;

  // Monkey patch generateAuthUrl to dynamically swap with the active authorization URL base
  const originalGenerateAuthUrl = client.generateAuthUrl;
  client.generateAuthUrl = function (scopes: string | string[], state: string) {
    const originalUrl = originalGenerateAuthUrl.call(this, scopes, state);
    return originalUrl.replace("https://www.tiktok.com/v2/auth/authorize/", activeAuthBase);
  };

  // Monkey patch getAccessToken to support an optional codeVerifier for PKCE compliance
  client.getAccessToken = async function (code: string, codeVerifier?: string) {
    const params = new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    if (codeVerifier) {
      params.append('code_verifier', codeVerifier);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url = `${(this as any).baseUrl || activeApiBase}/oauth/token/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TikTok token exchange failed: ${response.status} - ${errorText}`);
    }

    return response.json();
  };

  // Monkey patch refreshAccessToken to handle standard OAuth refresh token flow
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client as any).refreshAccessToken = async function (refreshToken: string) {
    const params = new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url = `${(this as any).baseUrl || activeApiBase}/oauth/token/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TikTok token refresh failed: ${response.status} - ${errorText}`);
    }

    return response.json();
  };

  return client;
}

export const pargoiClient = new Proxy({} as unknown as TikTokClient, {
  get(target, prop) {
    const client = getPargoiClient();
    const value = Reflect.get(client, prop);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  }
});