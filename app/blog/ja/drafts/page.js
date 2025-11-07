import { Suspense } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen px-12 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-mono font-normal text-gray-900">下書き</h1>
            <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">
              開発用
            </span>
          </div>
          <Link 
            href="/blog/drafts"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            en
          </Link>
        </div>
        
        <Suspense fallback={<div className="text-gray-600">読み込み中...</div>}>
          <DraftList 
            draftPosts={posts} 
            lang={lang} 
            baseUrl="/blog/ja/drafts" 
          />
        </Suspense>
    </div>
  );
}

