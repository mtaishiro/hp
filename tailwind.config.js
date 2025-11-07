/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'sidebar': '800px',
      },
      fontFamily: {
        sans: ['Sometype Mono', 'Courier New', 'monospace'],
        mono: ['Sometype Mono', 'Courier New', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#2c2c2c',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            h1: {
              color: '#1a1a1a',
            },
            h2: {
              color: '#1a1a1a',
            },
            h3: {
              color: '#1a1a1a',
            },
            h4: {
              color: '#1a1a1a',
            },
            strong: {
              color: '#1a1a1a',
            },
            code: {
              color: '#2c2c2c',
            },
            blockquote: {
              color: '#4a4a4a',
              borderLeftColor: '#d4d4d4',
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

