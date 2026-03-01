// Cloudflare Pages Function: /api/callback
// Exchanges GitHub OAuth code for access token, sends it back to Decap CMS
export async function onRequestGet(context) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = context.env;
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code parameter", { status: 400 });
  }

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return new Response("GitHub OAuth not configured", { status: 500 });
  }

  // Exchange code for access token
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`GitHub OAuth error: ${tokenData.error_description}`, { status: 400 });
  }

  // Send token back to Decap CMS via postMessage
  const html = `<!doctype html>
<html>
<body>
<script>
(function() {
  function sendMessage(provider, token) {
    const message = "authorization:" + provider + ":success:" + JSON.stringify({ token: token });
    window.opener.postMessage(message, "*");
    window.close();
  }
  sendMessage("github", "${tokenData.access_token}");
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
