// app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Auth Demo',
  description: 'Simple auth flow with Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/profile">Profile</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
