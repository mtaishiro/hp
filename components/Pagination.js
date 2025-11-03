import Link from 'next/link';

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center items-center gap-2 my-8">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}${currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ''}`}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          ← Prev
        </Link>
      )}
      
      {pages.map((page) => {
        const isActive = page === currentPage;
        const href = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
        
        return (
          <Link
            key={page}
            href={href}
            className={`px-4 py-2 rounded transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {page}
          </Link>
        );
      })}
      
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}

