import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getPost, 
  getAllPosts,
  getAdjacentPosts,
  getAlternateLangPost 
} from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const publicEnglishPosts = posts.filter(p => p.lang === 'en' && !p.draft);
  
  return publicEnglishPosts.map((post) => ({
    year: post.year.toString(),
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const year = parseInt(params.year, 10);
  const post = getPost(year, params.slug, 'en');
  
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

export default function BlogPostPage({ params }) {
  const year = parseInt(params.year, 10);
  const lang = 'en';
  const post = getPost(year, params.slug, lang);
  
  if (!post || post.draft) {
    notFound();
  }
  
  const { prev, next } = getAdjacentPosts(year, params.slug, lang);
  const alternateLang = getAlternateLangPost(year, params.slug, lang);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
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
                    href={`/blog?tag=${tag}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {alternateLang && (
            <Link
              href={`/ja/blog/${alternateLang.year}/${alternateLang.slug}`}
              className="inline-block text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              → 日本語版
            </Link>
          )}
        </header>
        
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
        
        <nav className="border-t border-gray-800 pt-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prev && (
              <Link
                href={`/blog/${prev.year}/${prev.slug}`}
                className="group p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <div className="text-sm text-gray-400 mb-1">← Previous</div>
                <div className="text-white group-hover:text-blue-400 transition-colors">
                  {prev.title}
                </div>
              </Link>
            )}
            
            {next && (
              <Link
                href={`/blog/${next.year}/${next.slug}`}
                className="group p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors md:text-right"
              >
                <div className="text-sm text-gray-400 mb-1">Next →</div>
                <div className="text-white group-hover:text-blue-400 transition-colors">
                  {next.title}
                </div>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}

