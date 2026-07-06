import {TikTokClient} from "pargoi";

function getPargoiClient() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY || "dummy_key";
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET || "dummy_secret";
  const redirectUri = process.env.TIKTOK_REDIRECT_URI || "http://localhost:3000/api/tiktok/callback";

  return new TikTokClient({
    clientKey,
    clientSecret,
    redirectUri,
  });
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