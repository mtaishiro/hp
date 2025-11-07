'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'home' },
    { href: '/blog', label: 'blog' },
    { href: '/works', label: 'works' },
  ];

  return (
    <aside className="fixed sidebar:left-0 left-0 sidebar:top-0 top-0 sidebar:h-screen h-16 sidebar:w-[200px] w-full bg-[#C9C3B1] flex sidebar:flex-col flex-row sidebar:px-6 px-8 sidebar:py-8 py-4 z-50">
      <nav className="flex sidebar:flex-col flex-row sidebar:gap-2 gap-6 sidebar:items-start items-center w-full sidebar:w-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || 
                          (link.href === '/blog' && pathname.startsWith('/blog')) ||
                          (link.href === '/works' && pathname.startsWith('/works'));
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base leading-normal transition-colors ${
                isActive
                  ? 'text-[#000000] font-medium'
                  : 'text-[#000000] hover:opacity-70'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

