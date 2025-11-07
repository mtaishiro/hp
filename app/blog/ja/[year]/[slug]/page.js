import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getPost, 
  getAllPosts,
  getAdjacentPosts,
  getAlternateLangPost 
} from '@/lib/posts';
import { formatDate } from '@/lib/formatDate';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const publicJapanesePosts = posts.filter(p => p.lang === 'ja' && !p.draft);
  
  return publicJapanesePosts.map((post) => ({
    year: post.year.toString(),
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const year = parseInt(params.year, 10);
  const post = getPost(year, params.slug, 'ja');
  
  if (!post || post.draft) {
    return {
      title: 'Not Found | taishi.ro',
    };
  }
  
  return {
    title: `${post.title} | taishi.ro`,
    description: post.summary || '',
  };
}

export default function BlogPostPageJa({ params }) {
  const year = parseInt(params.year, 10);
  const lang = 'ja';
  const post = getPost(year, params.slug, lang);
  
  if (!post || post.draft) {
    notFound();
  }
  
  const { prev, next } = getAdjacentPosts(year, params.slug, lang);
  const alternateLang = getAlternateLangPost(year, params.slug, lang);
  
  return (
    <div className="min-h-screen px-12 py-16">
      <article className="max-w-4xl">
        <header className="mb-10 pb-6 border-b border-gray-300">
          <h1 className="text-3xl font-normal text-gray-900 mb-3">{post.title}</h1>
          
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <time dateTime={post.date}>
              {formatDate(post.date, lang)}
            </time>
            {post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/ja?tag=${tag}`}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            {alternateLang && (
              <Link
                href={`/blog/${alternateLang.year}/${alternateLang.slug}`}
                className="text-gray-600 hover:text-gray-900 transition-colors ml-auto"
              >
                → en
              </Link>
            )}
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
        <nav className="border-t border-gray-300 pt-6 mt-12">
          <div className="flex flex-col gap-4">
            {prev && (
              <Link
                href={`/blog/ja/${prev.year}/${prev.slug}`}
                className="group flex items-baseline gap-2"
              >
                <span className="text-sm text-gray-600">← 前:</span>
                <span className="text-sm text-gray-900 group-hover:text-gray-600 transition-colors">
                  {prev.title}
                </span>
              </Link>
            )}
            
            {next && (
              <Link
                href={`/blog/ja/${next.year}/${next.slug}`}
                className="group flex items-baseline gap-2"
              >
                <span className="text-sm text-gray-600">次 →</span>
                <span className="text-sm text-gray-900 group-hover:text-gray-600 transition-colors">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}

