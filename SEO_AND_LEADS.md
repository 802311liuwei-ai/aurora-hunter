# Aurora Hunter SEO and lead setup

## Current indexing status

- Public search for `site:aurorahunterarctic.com` did not show indexed pages.
- `https://aurorahunterarctic.com` currently fails certificate validation because the served SSL certificate does not match the custom domain.
- `robots.txt` and `sitemap.xml` were missing on the live site at the time of the check.

## What the build now outputs

Running `pnpm build` creates:

- Route-specific static HTML for every public page.
- `dist/robots.txt`.
- `dist/sitemap.xml`.
- `dist/baidu-urls.txt`, a plain URL list for Baidu manual/API submission.

## Required hosting fixes

1. In GitHub Pages, make sure the custom domain is exactly `aurorahunterarctic.com`.
2. Keep the apex domain pointed to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Keep `www.aurorahunterarctic.com` as a CNAME to the GitHub Pages host.
4. Re-save the Pages custom domain, wait for certificate provisioning, then enable `Enforce HTTPS`.
5. After deployment, verify:
   - `https://aurorahunterarctic.com/robots.txt`
   - `https://aurorahunterarctic.com/sitemap.xml`

## Baidu submission

1. Add and verify `aurorahunterarctic.com` in Baidu Search Resource Platform.
2. Submit `https://aurorahunterarctic.com/sitemap.xml`.
3. Submit URLs from `dist/baidu-urls.txt`.
4. If Baidu provides an API push token, push the same URL list via their API endpoint.

Baidu's own guidance says link submission helps crawlers discover pages faster, but does not guarantee inclusion or ranking.

## Google Sheets lead capture

1. Create a Google Sheet for Aurora Hunter leads.
2. Open `Extensions -> Apps Script`.
3. Paste the contents of `integrations/google-sheets-leads.gs`.
4. In Apps Script project settings, add script property:
   - `NOTIFY_EMAIL`: the email address that should receive lead reminders.
5. Deploy as a Web App:
   - Execute as: Me
   - Who has access: Anyone
6. Copy the Web App URL and set it in the site environment:
   - `VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/.../exec`
   - On GitHub Pages, add it as the repository secret `VITE_GOOGLE_SHEETS_WEB_APP_URL`.
7. Rebuild and redeploy.

The form sends: name, contact, departure date, traveler count, interest, notes, page, referrer, submitted time, and source.
