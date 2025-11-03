import { Suspense } from 'react';
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Blog</h1>
        
        <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
          <BlogList 
            allPosts={posts} 
            allTags={tags} 
            lang={lang} 
            baseUrl="/blog" 
          />
        </Suspense>
      </div>
    </div>
  );
}

