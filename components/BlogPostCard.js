import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';

function truncateText(text, length = 120) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export default function BlogPostCard({ post, lang }) {
  const href = lang === 'ja' 
    ? `/blog/ja/${post.year}/${post.slug}`
    : `/blog/${post.year}/${post.slug}`;
  
  return (
    <article className="border-b border-gray-300 py-5 first:pt-0">
      <Link href={href} className="group">
        <h2 className="text-xl font-normal text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
          {post.title}
        </h2>
      </Link>
      
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
        <time dateTime={post.date}>
          {formatDate(post.date, lang)}
        </time>
        {post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog${lang === 'ja' ? '/ja' : ''}?tag=${tag}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {post.summary && (
        <p className="text-gray-700 leading-relaxed text-base">
          {truncateText(post.summary, 120)}
        </p>
      )}
    </article>
  );
}

