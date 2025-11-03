'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const isJapanese = pathname.startsWith('/ja');

  const navLinks = [
    { href: '/', label: 'Home', labelJa: 'ホーム' },
    { href: '/blog', label: 'Blog', labelJa: 'ブログ' },
    // Placeholders for future sections
    // { href: '/works', label: 'Works', labelJa: '作品' },
    // { href: '/about', label: 'About', labelJa: '私について' },
    // { href: '/contact', label: 'Contact', labelJa: '連絡先' },
  ];

  // Language toggle link
  const languageToggle = isJapanese
    ? { href: pathname.replace('/ja', '') || '/', label: 'EN' }
    : { href: `/ja${pathname}`, label: '日本語' };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link 
              href={isJapanese ? '/ja' : '/'} 
              className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
            >
              taishi.ro
            </Link>
            {navLinks.map((link) => {
              const href = isJapanese && link.href !== '/' ? `/ja${link.href}` : link.href;
              const isActive = pathname === href;
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {isJapanese ? link.labelJa : link.label}
                </Link>
              );
            })}
          </div>
          <Link
            href={languageToggle.href}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            {languageToggle.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}

