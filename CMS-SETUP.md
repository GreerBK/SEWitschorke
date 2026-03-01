# CMS Setup Guide — SE Witschorke Website

## How It Works

The site content lives in JSON files in the `/content` folder. When SE visits
`yoursite.com/admin`, she gets a friendly editor where she can change text,
upload images, add books, and manage gallery photos. When she hits "Publish",
it commits the changes to GitHub, Cloudflare Pages detects the commit, and
rebuilds the site automatically. She never touches code.

---

## Deployment Steps

### 1. Push to GitHub

Create a GitHub repo and push this project to it:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
2. Connect your GitHub account and select the repo
3. Build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npx next build`
   - **Build output directory**: `.next`
4. Click **Save and Deploy**

### 3. Create a GitHub OAuth App

This lets SE log into the admin panel:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: `SE Witschorke CMS`
   - **Homepage URL**: `https://YOUR_SITE.pages.dev`
   - **Authorization callback URL**: `https://YOUR_SITE.pages.dev/api/callback`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy it

### 4. Add Secrets to Cloudflare

1. In Cloudflare Dashboard → Pages → your project → Settings → Environment Variables
2. Add these two variables (for both Production and Preview):
   - `GITHUB_CLIENT_ID` = the Client ID from step 3
   - `GITHUB_CLIENT_SECRET` = the Client Secret from step 3

### 5. Update the CMS Config

Edit `public/admin/config.yml` and replace the placeholders:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME    # ← your actual repo
  branch: main
  base_url: https://YOUR_SITE.pages.dev         # ← your actual URL
  auth_endpoint: /api/auth
```

Commit and push. Cloudflare will rebuild.

### 6. Test It

1. Go to `https://YOUR_SITE.pages.dev/admin`
2. Click **Login with GitHub**
3. Authorize the OAuth app
4. You should see the content editor!

---

## What SE Can Edit

| Section | What She Can Change |
|---|---|
| **Site Settings** | Site title, subtitle, hero quote, hero image, author photo, social links |
| **About Page** | Bio paragraphs (add/remove/reorder), awards, food photos |
| **Books** | Add/edit/remove books with cover images, descriptions, categories |
| **Gallery** | Add/edit/remove photos with state selection and captions |

### To add a new book:
1. Go to admin → 📚 Books → Book List
2. Click "Add books" at the bottom of the list
3. Fill in title, upload cover, write description, pick category
4. Click **Publish** (top right)

### To add a gallery photo:
1. Go to admin → 🖼️ Gallery → Gallery Photos
2. Click "Add items" at the bottom
3. Upload photo, write alt text, pick the state from dropdown, write caption
4. Click **Publish**

### To edit the hero quote:
1. Go to admin → ⚙️ Site Settings → Site Info & Hero
2. Change the "Hero Quote" field
3. Click **Publish**

---

## Content File Locations

All editable content is in `/content/`:

```
content/
├── site.json      ← hero, social links, feeds
├── about.json     ← bio, awards, food photos
├── books.json     ← book list
└── gallery.json   ← gallery photos
```

These are plain JSON files. You can also edit them directly in the repo if you prefer.

---

## Troubleshooting

**"Login failed" on /admin**: Check that GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
are set correctly in Cloudflare environment variables, and that the callback URL
in your GitHub OAuth App matches `https://YOUR_SITE.pages.dev/api/callback` exactly.

**Changes don't appear**: Cloudflare Pages should auto-rebuild on each commit.
Check the deployments tab in Cloudflare. Builds take ~1-2 minutes.

**Images not showing**: Make sure images are uploaded through the CMS (not manually).
The CMS puts them in `/public/images/` which serves them at `/images/` on the site.

---

## Optional: Custom Domain

1. In Cloudflare Pages → your project → Custom domains
2. Add your domain (e.g., `sewitschorke.com`)
3. Update the GitHub OAuth App callback URL to use the custom domain
4. Update `base_url` in `public/admin/config.yml` to the custom domain
