'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import BlogPostCard from '@/components/BlogPostCard';
import Pagination from '@/components/Pagination';
import TagFilter from '@/components/TagFilter';

export default function BlogList({ allPosts, allTags, lang, baseUrl }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const tag = searchParams.get('tag') || null;
  
  // Filter posts by tag if specified
  const filteredPosts = useMemo(() => {
    if (!tag) return allPosts;
    return allPosts.filter(post => post.tags.includes(tag));
  }, [allPosts, tag]);
  
  // Paginate
  const { posts, currentPage, totalPages } = useMemo(() => {
    const perPage = 30;
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / perPage);
    const currentPage = Math.max(1, Math.min(page, totalPages || 1));
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    return {
      posts: filteredPosts.slice(startIndex, endIndex),
      currentPage,
      totalPages,
    };
  }, [filteredPosts, page]);
  
  return (
    <>
      <TagFilter tags={allTags} currentTag={tag} baseUrl={baseUrl} />
      
      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-12">
          {lang === 'ja' ? '記事が見つかりません。' : 'No posts found.'}
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
            baseUrl={tag ? `${baseUrl}?tag=${tag}` : baseUrl}
          />
        </>
      )}
    </>
  );
}

