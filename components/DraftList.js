'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import BlogPostCard from '@/components/BlogPostCard';
import Pagination from '@/components/Pagination';

export default function DraftList({ draftPosts, lang, baseUrl }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  // Paginate
  const { posts, currentPage, totalPages } = useMemo(() => {
    const perPage = 30;
    const totalPosts = draftPosts.length;
    const totalPages = Math.ceil(totalPosts / perPage);
    const currentPage = Math.max(1, Math.min(page, totalPages || 1));
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    return {
      posts: draftPosts.slice(startIndex, endIndex),
      currentPage,
      totalPages,
    };
  }, [draftPosts, page]);
  
  return (
    <>
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center py-12">
          {lang === 'ja' ? '下書き記事が見つかりません。' : 'No draft posts found.'}
        </p>
      ) : (
        <>
          <div className="space-y-0">
            {posts.map((post) => (
              <BlogPostCard key={`${post.year}-${post.slug}`} post={post} lang={lang} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        </>
      )}
    </>
  );
}

