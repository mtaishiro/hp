---
title: "Building a Blog with Next.js"
date: "2025-11-02"
summary: "How I built this blog using Next.js, Tailwind CSS, and Markdown. A deep dive into the technical architecture and design decisions."
tags: ["dev", "nextjs", "blog"]
lang: "en"
draft: true
---

# Building a Blog with Next.js

This blog is built with modern web technologies that make it fast, maintainable, and easy to update.

## Tech Stack

Here's what powers this blog:

### Next.js
Using Next.js 14 with the App Router for routing and static site generation. All pages are pre-rendered at build time for optimal performance.

### Tailwind CSS
Styled with Tailwind CSS and the Typography plugin for consistent, beautiful prose styling.

### Markdown & MDX
Posts are written in Markdown (or MDX for more advanced content), making it easy to write and maintain content in plain text files.

## Key Features

### Multi-language Support
The blog supports both English and Japanese, with dedicated routes:
- English: `/blog`
- Japanese: `/ja/blog`

### Tag Filtering
Posts can be filtered by tags, making it easy to find related content.

### Draft Mode
There's a draft mode for previewing posts before publishing them.

## Architecture Decisions

### Static Generation
Everything is statically generated, which means:
- Fast page loads
- No server required
- Can be hosted anywhere
- Great SEO

### Simple Deployment
Just push to GitHub, and Vercel automatically builds and deploys the site.

## What's Next?

Future improvements might include:
- RSS feed
- Search functionality
- Comment system
- Better image optimization

---

That's it for now! The code is clean, the architecture is solid, and I'm excited to start writing more content.

