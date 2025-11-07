import { Suspense } from 'react';
import Link from 'next/link';
import { getPublicPostsByLang, getTagsByLang } from '@/lib/posts';
import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog | taishi.ro',
  description: 'Blog posts by Taishiro',
};

export default function BlogPage() {
  const lang = 'en';
  const posts = getPublicPostsByLang(lang);
  const tags = getTagsByLang(lang);
  
  return (
    <div className="min-h-screen px-12 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-4xl font-mono font-normal text-gray-900">blog</h1>
        <Link 
          href="/blog/ja"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ja
        </Link>
      </div>
        
        <Suspense fallback={<div className="text-gray-600">Loading...</div>}>
          <BlogList 
            allPosts={posts} 
            allTags={tags} 
            lang={lang} 
            baseUrl="/blog" 
          />
        </Suspense>
    </div>
  );
}

