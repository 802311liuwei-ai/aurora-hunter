# Design QA

- visual direction: user-provided Aurora Hunter logo, existing original dark-navy / aurora-green design system
- desktop viewport tested: 1280 × 800
- mobile viewport tested: 390 × 844
- routes checked: `/`, `/#journeys`, `/experiences`, `/guides`, `/guide/winter-checklist`, `/booking`
- production build: passed

## Findings

No actionable P0, P1, or P2 findings remain.

- Brand: the supplied aurora-deer mark is used with an original typographic lockup in header and footer.
- Hero: three local aurora images crossfade on an 18-second loop with slow cinematic movement; reduced-motion users receive a static first frame.
- Content: journeys are presented as complete multi-stop routes rather than individually priced attractions.
- Home IA: the two complete winter itineraries are expanded directly on the home page; public tour-detail URLs fall back to the home experience.
- Scenery: six descriptive destination stories are presented without itinerary-detail CTAs; aurora chasing and the Sami village receive featured layouts.
- Guides: the guide index and long-form article routes contain complete Chinese content.
- Compliance: the supplied statement is visible in the footer and on the About page; local-agency execution and group Chinese service are repeated at relevant decision points.
- Promotional scope: no amount, per-person price, payment button, checkout, order lookup, or public admin UI is rendered. Legacy public URLs route to the inquiry page.
- Responsive layout: mobile document width equals the 390px viewport; no horizontal overflow was detected.
- Copyright: the implementation does not copy the reference site's layout or text. Existing local images remain covered by `CREDITS.md`; the logo is user-supplied.

## Verification

- Source scan returned no matches for amount symbols, price labels, payment labels, or booking CTAs.
- Browser audit on `/tours` returned no prohibited transaction text.
- Home audit returned two expanded itineraries, four featured aurora notes, three animated hero frames, and no horizontal overflow.
- Scenery audit returned six landscape stories, featured aurora and Sami sections, and no “查看逐日安排” text.
- `/booking` resolves to the consultation page headed “先告诉我们，你想怎样抵达北境”.
- Guide detail displayed all three complete article sections and the local-arrangement notice.

final result: passed
