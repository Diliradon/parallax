import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import { cn } from 'shared/lib';

import 'app/styles/global.css';

import { Header } from 'widgets';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Spice AI | LLM Leaderboard',
  description: 'Spice AI | LLM Leaderboard',
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={cn('', urbanist.className)}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
