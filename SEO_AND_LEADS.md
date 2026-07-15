# Aurora Hunter SEO and lead setup

## Current indexing status

- `https://aurorahunterarctic.com` returns `200` over HTTPS.
- `https://aurorahunterarctic.com/robots.txt` is live and points crawlers to the sitemap.
- `https://aurorahunterarctic.com/sitemap.xml` is live.
- Baidu site verification file is live at `https://aurorahunterarctic.com/baidu_verify_codeva-fBEp0wQVHH.html`.
- Public search has started to show the domain, but sitemap submission and ongoing content publishing are still needed for broader inclusion.

## What the build now outputs

Running `pnpm build` creates:

- Route-specific static HTML for every public page.
- `dist/robots.txt`.
- `dist/sitemap.xml`.
- `dist/baidu-urls.txt`, a plain URL list for Baidu manual/API submission.
- Final canonical URLs and sitemap URLs with trailing slashes, matching GitHub Pages' served URLs.
- Optional promotion tracking hooks for Baidu Tongji, Google Analytics / Google Ads, Bing UET, and Meta Pixel.

## Hosting checks

1. In GitHub Pages, make sure the custom domain is exactly `aurorahunterarctic.com`.
2. Keep the apex domain pointed to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Keep `www.aurorahunterarctic.com` as a CNAME to the GitHub Pages host.
4. Keep `Enforce HTTPS` enabled.
5. After deployment, verify:
   - `https://aurorahunterarctic.com/robots.txt`
   - `https://aurorahunterarctic.com/sitemap.xml`

## Baidu submission

1. Add and verify `aurorahunterarctic.com` in Baidu Search Resource Platform.
2. Submit `https://aurorahunterarctic.com/sitemap.xml`.
3. Submit URLs from `dist/baidu-urls.txt`.
4. If Baidu provides an API push token, push the same URL list via their API endpoint.

Baidu's own guidance says link submission helps crawlers discover pages faster, but does not guarantee inclusion or ranking.

## Promotion tracking

The website now supports these optional environment variables. Add them as GitHub repository secrets, then rebuild/deploy:

- `VITE_BAIDU_ANALYTICS_ID`: Baidu Tongji site ID from the `hm.js?...` script.
- `VITE_GA_MEASUREMENT_ID`: Google Analytics 4 measurement ID.
- `VITE_GOOGLE_ADS_ID`: Google Ads conversion ID.
- `VITE_GOOGLE_ADS_LEAD_LABEL`: Google Ads lead conversion label.
- `VITE_BING_UET_TAG_ID`: Microsoft Advertising / Bing UET tag ID.
- `VITE_META_PIXEL_ID`: Meta Pixel ID.

Tracked events:

- `page_view`: SPA page views.
- `cta_click`: clicks on itinerary / lead CTA buttons.
- `wechat_open`: WeChat consultation panel opened.
- `phone_click`: phone link clicked.
- `generate_lead`: lead form accepted by the frontend after submission to the Google Sheets web app.

Baidu Tongji receives `_trackPageview` and `_trackEvent` calls. Baidu Ads can use the Baidu Tongji event data or a conversion rule for the `/custom/` page plus the `generate_lead` event.

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
