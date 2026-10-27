# Personal website

A minimal, editorial single-page site for research / PhD / job applications.
Warm off-white theme, serif headings, auto-pulled Substack posts. No build step —
just static files you can host free on GitHub Pages.

## Make it yours

**Everything you edit lives in [`config.js`](config.js).** Open it and fill in:

- `name`, `tagline`, `intro`, `location`
- `links` — email, GitHub, Scholar, LinkedIn, etc. (delete any you don't want)
- `cv` — put your PDF in `assets/` and point to it (e.g. `assets/cv.pdf`)
- `substackUrl` — your publication base URL, e.g. `https://yourname.substack.com`
  (posts and thumbnails are fetched automatically from its RSS feed)
- `about`, `interests`, `news` — the About and Lately sections
- `publications`, `projects` — add/remove entries

You shouldn't need to touch `index.html`, `styles.css`, or `main.js`.
To change colors, edit the variables at the top of `styles.css`.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Open via a server, not the raw file — the Substack fetch needs `http://`.)

## Publish on GitHub Pages

1. Create a repo. For a URL like `https://<username>.github.io`, name the repo
   exactly `<username>.github.io`. Any other name gives
   `https://<username>.github.io/<repo>/`.
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Personal site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**. The included workflow deploys on every push.
4. Wait ~1 minute, then visit your Pages URL.

The `.nojekyll` file is included so GitHub serves the files as-is.

## Notes on the Substack feed

Substack's RSS doesn't allow direct browser requests (CORS), and the public CORS
proxies the site used to rely on stopped working. Instead, the deploy workflow
runs `scripts/fetch_posts.py`, which reads `<substackUrl>/feed` and writes
`posts.json`; the page loads that same-origin file. The workflow runs on every
push and once a day, so new posts appear within ~24 hours. Run
**Actions → Deploy to GitHub Pages → Run workflow** to refresh immediately, or
`python3 scripts/fetch_posts.py` locally to update the committed snapshot.

This requires **Settings → Pages → Source: GitHub Actions** (not "Deploy from a
branch").
