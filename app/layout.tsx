export const metadata = {
  title: 'FSU Catalog',
  description: 'FSU-branded items catalog grid',
};

import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header className="app-header">
            <h1>Florida State University Catalog</h1>
          </header>
          <main className="app-main">{children}</main>
          <footer className="app-footer">© {new Date().getFullYear()} FSU Catalog Demo</footer>
        </div>
      </body>
    </html>
  );
}
