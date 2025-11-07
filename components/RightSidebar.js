export default function RightSidebar() {
  const socialLinks = [
    { 
      label: 'Instagram', 
      href: 'https://www.instagram.com/taishi.ro/' 
    },
    { 
      label: 'Soundcloud', 
      href: 'https://soundcloud.com/tshro' 
    },
    { 
      label: 'OpenProcessing', 
      href: 'https://openprocessing.org/user/391345/' 
    },
    { 
      label: 'GitHub', 
      href: 'https://github.com/mtaishiro' 
    },
    { 
      label: 'Mail', 
      href: 'mailto:mtaishiro@proton.me' 
    },
  ];

  return (
    <aside className="fixed sidebar:right-0 right-0 sidebar:top-0 bottom-0 sidebar:h-screen h-16 sidebar:w-[200px] w-full bg-[#C9C3B1] flex sidebar:flex-col flex-row sidebar:px-6 px-8 sidebar:py-8 py-4 z-50">
      <nav className="flex sidebar:flex-col flex-row sidebar:gap-2 gap-4 sidebar:items-start items-center w-full sidebar:w-auto justify-center sidebar:justify-start">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-base leading-normal text-[#000000] hover:opacity-70 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

