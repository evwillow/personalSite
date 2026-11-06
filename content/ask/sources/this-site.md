---
id: site.this_site
title: evwillow.com and this Ask page (Projects page and /ask)
url: /ask
---
evwillow.com is a Next.js App Router portfolio and blog. Posts are authored as local MDX or in Contentful and rendered through a shared pipeline, with JSON-LD structured data and a generated sitemap (github.com/evwillow/personalSite).

This Ask page answers questions about Evan's work only from an allowlisted set of sources: the site pages, his public GitHub READMEs and the accepted claims on /verify. Every answer cites its sources. A plain-code validator checks each answer after it is generated and blocks it if it states a number that does not match a cited accepted claim. The server route has a per-IP rate limit and a daily dollar cap; when the cap is reached the page pauses until the next day. Analytics record only a question category and a hash of the question, never its text.
