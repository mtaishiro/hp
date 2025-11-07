# taishi.ro

Personal portfolio and blog website built with Next.js, Tailwind CSS, and MDX.

## Features

- 🌐 **Multi-language Support** - English and Japanese versions
- 📝 **Markdown/MDX Blog** - Write posts in Markdown or MDX
- 🏷️ **Tag Filtering** - Filter posts by tags
- 📄 **Static Site Generation** - Fast, SEO-friendly pages
- 🎨 **Dark Theme** - Modern dark design with Tailwind CSS
- 📱 **Responsive** - Works on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with Typography plugin
- **Content**: Markdown & MDX with frontmatter
- **Deployment**: Vercel (auto-deploy from GitHub)

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
│   ├── blog/              # English blog routes
│   ├── ja/                # Japanese routes
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   ├── Navigation.js      # Global navigation
│   ├── BlogPostCard.js    # Blog post card
│   ├── Pagination.js      # Pagination component
│   └── TagFilter.js       # Tag filter component
├── lib/                   # Utility functions
│   ├── posts.js           # Blog post utilities
│   └── mdx.js             # MDX compilation
├── posts/                 # Blog posts
│   └── YYYY/              # Year-based folders
│       ├── slug.en.md     # English post
│       └── slug.ja.md     # Japanese post
├── public/                # Static assets
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

- Won't appear in `/blog` or `/ja/blog`
- Will appear in `/blog/drafts` or `/ja/blog/drafts`
- Useful for work-in-progress posts

## URL Structure

- Home (EN): `/`
- Home (JA): `/ja`
- Blog List (EN): `/blog`
- Blog List (JA): `/ja/blog`
- Blog Post (EN): `/blog/YYYY/slug`
- Blog Post (JA): `/ja/blog/YYYY/slug`
- Drafts (EN): `/blog/drafts`
- Drafts (JA): `/ja/blog/drafts`
- Tag Filter: `/blog?tag=tagname`

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
