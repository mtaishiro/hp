import { Suspense } from 'react';
import Link from 'next/link';
import { getPublicPostsByLang, getTagsByLang } from '@/lib/posts';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'ブログ | taishi.ro',
  description: 'Taishiroのブログ記事',
};

export default function BlogPageJa() {
  const lang = 'ja';
  const posts = getPublicPostsByLang(lang);
  const tags = getTagsByLang(lang);
  
  return (
    <div className="min-h-screen px-12 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-4xl font-mono font-normal text-gray-900">ブログ</h1>
        <Link 
          href="/blog"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          en
        </Link>
      </div>
        
        <Suspense fallback={<div className="text-gray-600">読み込み中...</div>}>
          <BlogList 
            allPosts={posts} 
            allTags={tags} 
            lang={lang} 
            baseUrl="/blog/ja" 
          />
        </Suspense>
    </div>
  );
}

