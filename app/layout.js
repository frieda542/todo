export const metadata = {
  title: 'Todo App',
  description: 'A Next.js todo app with localStorage persistence',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
