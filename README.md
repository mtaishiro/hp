# taishi.ro

Personal portfolio and blog website built with Next.js, Tailwind CSS, and MDX.

## Features

- 🌐 **Multi-language Support** - English and Japanese blog versions
- 📝 **Markdown/MDX Blog** - Write posts in Markdown or MDX
- 🏷️ **Tag Filtering** - Filter posts by tags
- 📄 **Static Site Generation** - Fast, SEO-friendly pages
- 🎨 **Minimalist Design** - Clean, light-themed interface with custom typography
- 🎭 **Interactive Home** - Animated orbiting icons and dynamic arrows
- 📱 **Fully Responsive** - Adaptive sidebar navigation (transforms to top/bottom bars on mobile)
- 🎯 **Fixed Sidebars** - Left navigation and right social links

## Tech Stack

- **Framework**: Next.js 15.1.6 (App Router)
- **Styling**: Tailwind CSS with Typography plugin
- **Typography**: Sometype Mono (custom monospace font)
- **Content**: Markdown & MDX with frontmatter
- **Animations**: React hooks for smooth icon orbiting and dynamic SVG arrows
- **Deployment**: Vercel (auto-deploy from GitHub)

## Known Issues

### Next.js 15.1.6 Static Export Bug

**Issue**: Next.js 15.1.6 has a bug where `generateStaticParams()` is not detected during static export builds when the function returns an empty array.

**Symptoms**: Build fails with error: `Page "/blog/[year]/[slug]" is missing "generateStaticParams()" so it cannot be used with "output: export" config.`

**Root Cause**: When all blog posts are drafts (no published posts), `generateStaticParams()` returns an empty array `[]`, and Next.js 15.1.6's static export mode fails to recognize the function exists.

**Workaround**: Ensure at least one post is published (not a draft) for each language route. The function is correctly implemented and works fine when it returns a non-empty array.

**Status**: This is a Next.js bug, not an issue with our code. The `generateStaticParams()` functions are correctly implemented in both `/app/blog/[year]/[slug]/page.js` and `/app/blog/ja/[year]/[slug]/page.js`.

## Design

- **Color Palette**:
  - Background: `#F4EED9` (warm beige)
  - Sidebars: `#C9C3B1` (light taupe)
  - Text: `#2c2c2c` (dark gray)
  - Accents: `#000000` (black), `#4D4C4C` (medium gray)
- **Layout**: Fixed dual sidebar design (200px each) with centered content
- **Responsive Breakpoint**: 800px (sidebars transform to top/bottom bars below this)
- **Interactive Elements**: Rotating orbital icons, dynamic arrows pointing to category labels

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taishi.ro.git
cd taishi.ro
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
taishi.ro/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog routes
│   │   ├── page.js        # English blog list
│   │   ├── ja/            # Japanese blog routes
│   │   ├── drafts/        # Draft posts
│   │   └── [year]/[slug]/ # Blog post pages
│   ├── works/             # Works/portfolio page
│   ├── globals.css        # Global styles & custom fonts
│   ├── layout.js          # Root layout with sidebars
│   └── page.js            # Interactive home page
├── components/            # React components
│   ├── Sidebar.js         # Left navigation sidebar
│   ├── RightSidebar.js    # Right social links sidebar
│   ├── BlogPostCard.js    # Blog post card
│   ├── Pagination.js      # Pagination component
│   ├── TagFilter.js       # Tag filter component
│   └── MDXContent.js      # MDX content renderer
├── lib/                   # Utility functions
│   ├── posts.js           # Blog post utilities
│   ├── mdx.js             # MDX compilation
│   └── formatDate.js      # Date formatting
├── posts/                 # Blog posts
│   └── YYYY/              # Year-based folders
│       ├── slug.en.md     # English post
│       └── slug.ja.md     # Japanese post
├── public/                # Static assets
│   ├── fonts/             # Custom fonts (Sometype Mono)
│   └── icons/             # Home page icons
└── next.config.js         # Next.js configuration
```

## Writing Blog Posts

### Creating a New Post

1. Create a new file in `posts/YYYY/` (e.g., `posts/2025/my-post.en.md`)
2. Add frontmatter:

```yaml
---
title: "Your Post Title"
date: "2025-11-03"
summary: "A brief summary of your post (120 chars recommended)"
tags: ["tag1", "tag2"]
lang: "en"
draft: false
---
```

3. Write your content in Markdown
4. Commit and push to GitHub - Vercel will automatically build and deploy

### Frontmatter Fields

- **title** (required): Post title
- **date** (required): Publication date (YYYY-MM-DD)
- **summary** (required): Brief description for post list
- **tags** (required): Array of tags (English slugs)
- **lang** (required): "en" or "ja"
- **draft** (optional): Set to `true` to hide from public list
- **slug** (optional): Custom slug (defaults to filename)
- **thumbnail** (optional): Path to thumbnail image

### Multi-language Posts

To create a bilingual post, create two files with the same slug:

```
posts/2025/my-post.en.md
posts/2025/my-post.ja.md
```

The site will automatically link them together.

### Draft Posts

Set `draft: true` in the frontmatter to hide posts from the main blog:

- Won't appear in `/blog` or `/blog/ja`
- Will appear in `/blog/drafts` or `/blog/ja/drafts`
- Useful for work-in-progress posts

## URL Structure

- Home: `/`
- Works: `/works`
- Blog List (EN): `/blog`
- Blog List (JA): `/blog/ja`
- Blog Post (EN): `/blog/YYYY/slug`
- Blog Post (JA): `/blog/ja/YYYY/slug`
- Drafts (EN): `/blog/drafts`
- Drafts (JA): `/blog/ja/drafts`
- Tag Filter (EN): `/blog?tag=tagname`
- Tag Filter (JA): `/blog/ja?tag=tagname`

**Note**: Language switcher is only available on blog pages, not on home or works pages.

## Home Page

The home page features an interactive design with:

- **Central Person Icon**: Static center point
- **Orbiting Icons**: Three icons (music, tech, tea) rotating around the center
  - Music icon links to SoundCloud
  - Tech icon links to GitHub
  - Tea icon links to Blog
- **Category Labels**: "cul." (culture) and "nat." (nature) positioned in corners
- **Dynamic Arrows**: Animated dashed arrows pointing from the orbit to category labels
- **Responsive Animation**: Arrow lengths and positions adjust based on screen size

All icons are sourced from Flaticon with proper attribution (see Icons section below).

## Responsive Design

The site adapts to different screen sizes:

### Desktop (≥ 800px)
- Fixed left sidebar (200px) with navigation
- Fixed right sidebar (200px) with social links
- Centered content area
- Full home page animation with long arrows

### Mobile (< 800px)
- Top navigation bar (horizontal layout)
- Bottom social links bar (horizontal layout)
- Full-width content
- Adjusted home page layout with shorter arrows

The custom Tailwind breakpoint `sidebar` is used throughout for consistent responsive behavior.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Every push to `main` will trigger a new deployment

### Custom Domain

1. Add your domain in Vercel project settings
2. Update DNS records as instructed
3. SSL is automatically provisioned

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables are required for basic functionality.

## License

Private project - all rights reserved.

## Author

Taishiro - [mtaishiro@proton.me](mailto:mtaishiro@proton.me)

## Links

- Portfolio: [taishi.ro](https://taishi.ro)
- Instagram: [@taishi.ro](https://www.instagram.com/taishi.ro/)
- SoundCloud: [tshro](https://soundcloud.com/tshro)
- OpenProcessing: [Profile](https://openprocessing.org/user/391345/)

## Icons

This project uses icons from [Flaticon].

- Tea tree oil icons created by Prosymbols Premium from [Flaticon].
- Graph icons created by Grafixpoint from [Flaticon].
- Sound waves icon created by juicy_fish from [Flaticon].
- Human icon created by meaicon from [Flaticon].

[Flaticon]: https://www.flaticon.com/
