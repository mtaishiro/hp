import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center gap-4 my-10 pt-6 border-t border-gray-300">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}${currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ''}`}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← prev
        </Link>
      )}
      
      <div className="flex items-center gap-2">
      {pages.map((page) => {
        const isActive = page === currentPage;
        const href = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
        
        return (
          <Link
            key={page}
            href={href}
              className={`text-sm transition-colors ${
              isActive
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {page}
          </Link>
        );
      })}
      </div>
      
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          next →
        </Link>
      )}
    </nav>
  );
}

