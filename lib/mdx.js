import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * Compile MDX content to React component
 * @param {string} source - MDX source string
 * @returns {Promise<string>} Compiled JSX code
 */
export async function compileMDX(source) {
  try {
    const compiled = await compile(source, {
      outputFormat: 'function-body',
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    });
    
    return String(compiled);
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
}

