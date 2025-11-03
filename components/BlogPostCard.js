import Link from 'next/link';

function truncateText(text, length = 120) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export default function BlogPostCard({ post, lang }) {
  const href = lang === 'ja' 
    ? `/ja/blog/${post.year}/${post.slug}`
    : `/blog/${post.year}/${post.slug}`;
  
  return (
    <article className="border-b border-gray-800 py-6 first:pt-0">
      <Link href={href} className="group">
        <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`${lang === 'ja' ? '/ja' : ''}/blog?tag=${tag}`}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {post.summary && (
        <p className="text-gray-300 leading-relaxed">
          {truncateText(post.summary, 120)}
        </p>
      )}
    </article>
  );
}

