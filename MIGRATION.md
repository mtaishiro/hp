# Migration Guide: Create React App → Next.js

This document outlines the migration from Create React App to Next.js with blog functionality.

## What Changed

### Framework Migration
- **From**: Create React App (react-scripts)
- **To**: Next.js 14 with App Router
- **Why**: Static site generation, better performance, file-based routing, built-in optimization

### New Features Added
✅ Multi-language blog support (EN/JA)
✅ Markdown/MDX post authoring
✅ Tag filtering and pagination
✅ Draft mode for work-in-progress posts
✅ Static site generation (SSG)
✅ Tailwind CSS with Typography plugin
✅ Responsive navigation with language switcher

## Directory Structure Changes

### Old Structure (CRA)
```
src/
  App.js
  App.css
  index.js
  index.css
public/
build/ (output)
```

### New Structure (Next.js)
```
app/                    # Pages (App Router)
  blog/                # English blog
  ja/                  # Japanese routes
  layout.js            # Root layout
  page.js              # Home page
  globals.css          # Global styles
components/            # React components
lib/                   # Utilities
posts/                 # Blog posts (Markdown/MDX)
  YYYY/                # Year-based organization
public/                # Static assets
out/                   # Build output (SSG)
```

## Files to Keep

These files from the old setup are no longer needed but kept for reference:
- `src/` folder (old React components)
- `build/` folder (old build output)

You can safely delete them once you've verified the migration works.

## Files to Delete (Optional)

Once the new site is working, you can remove:
- `src/` directory
- `build/` directory  
- `public/index.html` (Next.js generates this)
- `public/manifest.json` (if not needed)

## Next Steps

### 1. Install Dependencies

Run this command to install all required packages:

```bash
npm install
```

If you see permission errors with npm cache, run:
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

### 2. Test Locally

Start the development server:

```bash
npm run dev
```

Visit:
- Home: http://localhost:3000
- Blog: http://localhost:3000/blog
- Japanese Blog: http://localhost:3000/ja/blog
- Drafts: http://localhost:3000/blog/drafts

### 3. Build for Production

Test the production build:

```bash
npm run build
```

This will create an `out/` directory with static files.

### 4. Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

#### Option B: Vercel Dashboard
1. Go to https://vercel.com
2. Import your GitHub repository
3. Vercel will auto-detect Next.js
4. Deploy!

### 5. Configure Custom Domain

In Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

The `CNAME` file in the repository will be included in the build.

## Configuration Files

### next.config.js
- Configures static export (`output: 'export'`)
- Disables image optimization for static hosting
- Sets output directory to `out/`

### tailwind.config.js
- Configures Tailwind CSS
- Includes Typography plugin for blog posts
- Sets up dark theme colors

### vercel.json
- Tells Vercel how to build the project
- Uses `out/` directory for static files

## Deployment Workflow

### Old Workflow (GitHub Pages)
```bash
npm run build
npm run deploy  # gh-pages
```

### New Workflow (Vercel)
```bash
git add .
git commit -m "Update"
git push origin main
# Vercel automatically builds and deploys!
```

## Writing Blog Posts

### Create a new post:

1. Create file: `posts/2025/my-slug.en.md`

2. Add frontmatter:
```yaml
---
title: "Post Title"
date: "2025-11-03"
summary: "Brief description"
tags: ["tag1", "tag2"]
lang: "en"
draft: false
---
```

3. Write content in Markdown

4. Commit and push to GitHub

5. Vercel automatically builds and deploys!

### For bilingual posts:

Create both:
- `posts/2025/my-slug.en.md`
- `posts/2025/my-slug.ja.md`

They'll be automatically linked.

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Cache issues
```bash
rm -rf .next
rm -rf out
npm run dev
```

### Module not found
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Features Not Yet Implemented

These are planned for future:
- RSS feed (`/blog/feed.xml`)
- Full-text search
- Comment system
- OGP image generation
- Year archive pages (`/blog/2025`)

## Questions?

Check the main README.md for full documentation or contact mtaishiro@proton.me

