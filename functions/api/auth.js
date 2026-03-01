// Cloudflare Pages Function: /api/auth
// Redirects to GitHub OAuth authorization page
export async function onRequestGet(context) {
  const { GITHUB_CLIENT_ID } = context.env;

  if (!GITHUB_CLIENT_ID) {
    return new Response("GITHUB_CLIENT_ID not configured", { status: 500 });
  }

  const redirectUri = new URL("/api/callback", context.request.url).toString();
  const scope = "repo,user";

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
  githubAuthUrl.searchParams.set("scope", scope);

  return Response.redirect(githubAuthUrl.toString(), 302);
}
