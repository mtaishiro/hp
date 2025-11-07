import Link from 'next/link';

export default function TagFilter({ tags, currentTag, baseUrl }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mb-10 pb-6 border-b border-gray-300">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm text-gray-600">tags:</span>
        <Link
          href={baseUrl}
          className={`text-sm transition-colors ${
            !currentTag
              ? 'text-gray-900 font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          all
        </Link>
        {tags.map(({ tag, count }) => {
          const isActive = currentTag === tag;
          return (
            <Link
              key={tag}
              href={`${baseUrl}?tag=${tag}`}
              className={`text-sm transition-colors ${
                isActive
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tag} ({count})
            </Link>
          );
        })}
      </div>
    </div>
  );
}

