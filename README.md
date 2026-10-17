# Ledgerline – 3-page Angular SPA
Routes: /login · /relogin · /billing (guarded)

## Local
    npm install
    npm start

## Deploy on Render (static site)
1. Push this folder to a GitHub/GitLab repo.
2. Render dashboard → New → Blueprint → select the repo (reads render.yaml).
   Or New → Static Site with:
   - Build command:  npm install && npm run build
   - Publish directory: dist/ledgerline/browser
   - Redirects/Rewrites: Source /*  →  Destination /index.html  (Action: Rewrite)
3. Add env var NODE_VERSION = 20.18.0.

The entry point is the built index.html; Render serves it for every route.

## Embedding from a separate static HTML (hosted anywhere)
- `host/index.html` is a single static file. Set `APP_URL` to your Render URL and upload it to any static host.
- It loads the app in a full-screen iframe. `host/index.html#/billing` opens a specific page.
- Lock embedding down: in render.yaml, change `frame-ancestors *` to your HTML host's origin
  (e.g. `frame-ancestors https://www.example.com`), then redeploy.
