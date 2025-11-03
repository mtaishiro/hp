import { Suspense } from 'react';
import { getDraftPostsByLang } from '@/lib/posts';
import DraftList from '@/components/DraftList';

export const metadata = {
  title: '下書き | taishi.ro',
  description: '下書き記事',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DraftsPageJa() {
  const lang = 'ja';
  const posts = getDraftPostsByLang(lang);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-white">下書き</h1>
          <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">
            開発用
          </span>
        </div>
        
        <Suspense fallback={<div className="text-gray-400">読み込み中...</div>}>
          <DraftList 
            draftPosts={posts} 
            lang={lang} 
            baseUrl="/ja/blog/drafts" 
          />
        </Suspense>
      </div>
    </div>
  );
}

