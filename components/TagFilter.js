import Link from 'next/link';

export default function TagFilter({ tags, currentTag, baseUrl }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Filter by Tag
      </h3>
      <div className="flex flex-wrap gap-2">
        <Link
          href={baseUrl}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            !currentTag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </Link>
        {tags.map(({ tag, count }) => {
          const isActive = currentTag === tag;
          return (
            <Link
              key={tag}
              href={`${baseUrl}?tag=${tag}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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

