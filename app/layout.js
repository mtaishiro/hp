import './globals.css';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';

export const metadata = {
  title: 'taishi.ro',
  description: 'Portfolio & Blog by Taishiro',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="sidebar:ml-[200px] sidebar:mr-[200px] ml-0 mr-0 mt-0 mb-0">{children}</main>
        <RightSidebar />
      </body>
    </html>
  );
}

