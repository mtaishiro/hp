/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#e5e5e5',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            h1: {
              color: '#f5f5f5',
            },
            h2: {
              color: '#f5f5f5',
            },
            h3: {
              color: '#f5f5f5',
            },
            h4: {
              color: '#f5f5f5',
            },
            strong: {
              color: '#f5f5f5',
            },
            code: {
              color: '#e5e5e5',
            },
            blockquote: {
              color: '#d4d4d4',
              borderLeftColor: '#525252',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

