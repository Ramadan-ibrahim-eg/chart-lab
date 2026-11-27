# Chart Lab

A free chart maker for people who are not developers. No sign-up and no accounts. Enter your numbers, pick a chart type, download the chart as SVG or PNG. Built on Cloudflare Workers.

Chart types: bar, line, pie, area, stacked, donut, scatter and radar. It has a light and a dark theme.

## How it works

- The page is rendered by one Worker (`src/worker.js`). All files are plain JavaScript modules, with no build step.
- The chart itself is drawn by the [Divctor]API (`api.divct.workers.dev`). Chart Lab sends the chart parameters to it and shows the SVG that comes back. The PNG file is made in the browser.
- `/api/chart` only answers requests from the site's own pages: an origin check plus a short-lived signed token (HMAC, one hour).
- Input is validated before anything is sent (for example, at most 100 values).
- Generated charts are cached for one hour with the Cache API. There are no accounts and no database.

## Layout

- `src/worker.js`: routing and security headers.
- `src/routes/`: `/api/chart` and the meta routes (sitemap, robots, manifest, health).
- `src/lib/`: Divctor client, validation, signed tokens, origin guard, cache, responses.
- `src/views/`: the pages (home, create, download, about, privacy, cookies, terms).
- `src/public/` and `src/content/`: styles, scripts, logo, social image and page text.

## Configuration

Only the source files are published here. To run your own copy you need a Worker with module files (`no_bundle`) and these values, set as secrets (never commit them):

- `DIVCTOR_API_KEY`: your key for the Divctor API.
- `SIGNING_SECRET`: a long random string used to sign the short-lived tokens.
- `DIVCTOR_BASE_URL` (optional): another Divctor API address.

The site address is set in `src/content/strings.js` (`SITE.url`) and in `src/lib/guard.js` (`ALLOWED_ORIGIN`). Change both for your own domain.
