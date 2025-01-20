import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

import { siteConfig } from './siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoururl.com'),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: 'yourname',
      url: '',
    },
  ],
  creator: 'yourname',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tremor OSS Dashboard',
    creator: '@tremorlabs',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} overflow-y-scroll scroll-auto antialiased selection:bg-indigo-100  dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-screen-2xl">
          <ThemeProvider defaultTheme="system" attribute="class">
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
