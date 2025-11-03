import { Suspense } from 'react';
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">ブログ</h1>
        
        <Suspense fallback={<div className="text-gray-400">読み込み中...</div>}>
          <BlogList 
            allPosts={posts} 
            allTags={tags} 
            lang={lang} 
            baseUrl="/ja/blog" 
          />
        </Suspense>
      </div>
    </div>
  );
}

