import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * Get all posts recursively from the posts directory
 * @returns {Array} Array of post objects
 */
export function getAllPosts() {
  const posts = [];
  
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return posts;
  }
  
  // Get all year directories
  const years = fs.readdirSync(postsDirectory).filter((item) => {
    const itemPath = path.join(postsDirectory, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  years.forEach((year) => {
    const yearPath = path.join(postsDirectory, year);
    const files = fs.readdirSync(yearPath).filter((file) => {
      return file.endsWith('.md') || file.endsWith('.mdx');
    });
    
    files.forEach((filename) => {
      const filePath = path.join(yearPath, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Parse filename: slug.lang.md(x)
      const matches = filename.match(/^(.+)\.(en|ja)\.(mdx?)$/);
      if (!matches) return;
      
      const [, slugFromFilename, lang, extension] = matches;
      const slug = data.slug || slugFromFilename;
      
      posts.push({
        title: data.title || '',
        date: data.date || '',
        summary: data.summary || '',
        tags: data.tags || [],
        lang: data.lang || lang,
        draft: data.draft === true,
        slug,
        year: parseInt(year, 10),
        path: filePath,
        thumbnail: data.thumbnail || '',
        content,
        extension,
      });
    });
  });
  
  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return posts;
}

/**
 * Get published posts by language
 * @param {string} lang - "en" or "ja"
 * @returns {Array} Array of published post objects
 */
export function getPublicPostsByLang(lang) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => !post.draft && post.lang === lang);
}

/**
 * Get published posts by language and tag
 * @param {string} lang - "en" or "ja"
 * @param {string} tag - Tag to filter by
 * @returns {Array} Array of published post objects
 */
export function getPublicPostsByLangAndTag(lang, tag) {
  const posts = getPublicPostsByLang(lang);
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Paginate posts
 * @param {Array} posts - Array of posts
 * @param {number} page - Page number (1-indexed)
 * @param {number} perPage - Posts per page (default: 30)
 * @returns {Object} Paginated result with posts and pagination info
 */
export function paginate(posts, page = 1, perPage = 30) {
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return {
    posts: posts.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/**
 * Get a single post by year, slug, and language
 * @param {number} year - Year
 * @param {string} slug - Post slug
 * @param {string} lang - "en" or "ja"
 * @returns {Object|null} Post object or null
 */
export function getPost(year, slug, lang) {
  const allPosts = getAllPosts();
  return allPosts.find(
    (post) => post.year === year && post.slug === slug && post.lang === lang
  ) || null;
}

/**
 * Get adjacent posts (previous and next)
 * @param {number} year - Year
 * @param {string} slug - Post slug
 * @param {string} lang - "en" or "ja"
 * @returns {Object} Object with prev and next posts
 */
export function getAdjacentPosts(year, slug, lang) {
  const posts = getPublicPostsByLang(lang);
  const currentIndex = posts.findIndex(
    (post) => post.year === year && post.slug === slug
  );
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}

/**
 * Check if a post has an alternate language version
 * @param {number} year - Year
 * @param {string} slug - Post slug
 * @param {string} currentLang - Current language
 * @returns {Object|null} Alternate language post or null
 */
export function getAlternateLangPost(year, slug, currentLang) {
  const allPosts = getAllPosts();
  const alternateLang = currentLang === 'en' ? 'ja' : 'en';
  
  return allPosts.find(
    (post) => post.year === year && post.slug === slug && post.lang === alternateLang && !post.draft
  ) || null;
}

/**
 * Get draft posts by language
 * @param {string} lang - "en" or "ja"
 * @returns {Array} Array of draft post objects
 */
export function getDraftPostsByLang(lang) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.draft && post.lang === lang);
}

/**
 * Get all unique tags used by published posts in a specific language
 * @param {string} lang - "en" or "ja"
 * @returns {Array} Array of tag objects with count
 */
export function getTagsByLang(lang) {
  const posts = getPublicPostsByLang(lang);
  const tagCounts = {};
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get posts by year and language
 * @param {number} year - Year
 * @param {string} lang - "en" or "ja"
 * @returns {Array} Array of published post objects
 */
export function getPostsByYearAndLang(year, lang) {
  const posts = getPublicPostsByLang(lang);
  return posts.filter((post) => post.year === year);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length (default: 120)
 * @returns {string} Truncated text
 */
export function truncateText(text, length = 120) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

