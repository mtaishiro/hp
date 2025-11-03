import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'taishi.ro',
  description: 'Portfolio & Blog by Taishiro',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}

