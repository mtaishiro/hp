'use client';

import { useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';

// Custom components for MDX
const components = {
  InfoBox: ({ children, type = 'info' }) => {
    const colors = {
      info: 'bg-blue-50 border-blue-500',
      warning: 'bg-yellow-50 border-yellow-500',
      error: 'bg-red-50 border-red-500',
      success: 'bg-green-50 border-green-500',
    };
    
    return (
      <div className={`border-l-4 p-4 my-4 ${colors[type] || colors.info}`}>
        {children}
      </div>
    );
  },
  
  YouTube: ({ id }) => (
    <div className="aspect-w-16 aspect-h-9 my-8">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  ),
  
  Divider: () => (
    <hr className="my-8 border-gray-300" />
  ),
};

export default function MDXContent({ code }) {
  const [MdxComponent, setMdxComponent] = useState(null);

  useEffect(() => {
    const hydrate = async () => {
      try {
        // Create a function from the compiled code
        const { default: Component } = await eval(code)(runtime);
        setMdxComponent(() => Component);
      } catch (error) {
        console.error('Error hydrating MDX:', error);
      }
    };

    hydrate();
  }, [code]);

  if (!MdxComponent) {
    return <div className="text-gray-600">Loading...</div>;
  }

  return (
    <MDXProvider components={components}>
      <div className="prose max-w-none">
        <MdxComponent />
      </div>
    </MDXProvider>
  );
}

