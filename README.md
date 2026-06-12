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
- `projects` — add/remove entries
- `publications` — add/remove entries

You shouldn't need to touch `index.html`, `styles.css`, or `main.js`.
To change colors, edit the variables at the top of `styles.css`.

## Preview locally

```bash
cd personal_website
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
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`. Save.
4. Wait ~1 minute, then visit your Pages URL.

The `.nojekyll` file is included so GitHub serves the files as-is.

## Notes on the Substack feed

Substack's RSS doesn't allow direct browser requests (CORS), so the site reads it
through a public read-only proxy and falls back to a second one if the first is
down. If both ever fail, visitors see a "Read on Substack →" link instead. Nothing
to configure — but if you'd rather not depend on a proxy, tell your assistant and
they can switch the Writing section to hand-listed posts.
