import { editorsNote, neueHaasGroteskDisplay } from '@/utils/customFonts';
import './globals.scss';
import { ReactLenis } from 'lenis/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick Salloum — Senior UI Engineer & Product Designer',
  description:
    'Rick Salloum is a Senior UI Engineer and Product Designer creating scalable, accessible digital products through design systems, React, UX/UI design, and front-end architecture.',

  keywords: [
    'Rick Salloum',
    'Senior UI Engineer',
    'Product Designer',
    'UI Engineer',
    'UI Developer',
    'UX UI Designer',
    'Design Systems',
    'React Developer',
    'Front-End Developer',
    'Front-End Architecture',
    'Figma',
    'Responsive Web Design',
    'Accessibility',
    'Digital Product Design',
    'Next.js Portfolio',
  ],

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  authors: [{ name: 'Rick Salloum', url: 'https://rizkallahsalloum.com' }],

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rizkallahsalloum.com',
    siteName: 'Rick Salloum — Design Systems, UI Engineering & Product Design',
    title: 'Rick Salloum — Senior UI Engineer & Product Designer',
    description:
      'Portfolio of Rick Salloum, showcasing UI engineering, product design, design systems, React interfaces, and design-to-code digital experiences.',
    images: [
      { url: '/assets/meta/og-image.webp', type: 'image/webp' },
      { url: '/assets/meta/og-image.png', type: 'image/png' },
    ],
  },

  metadataBase: new URL('https://rizkallahsalloum.com'),

  alternates: {
    canonical: 'https://rizkallahsalloum.com',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'portfolio',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${neueHaasGroteskDisplay.variable} ${editorsNote.variable}`}
    >
      <body className="grid">
        <ReactLenis root>{children} </ReactLenis>
      </body>
    </html>
  );
}
