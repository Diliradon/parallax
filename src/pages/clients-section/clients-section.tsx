/* eslint-disable no-magic-numbers */
import Image from 'next/image';
import Link from 'next/link';

import { Marquee } from 'shared/ui';

interface Client {
  url: string;
  logo: string;
  alt: string;
  aspectRatio?: 'square' | 'wide'; // Optional aspect ratio hint
}

const clients: Client[] = [
  {
    url: '#',
    logo: '/images/companies/arweave.png',
    alt: 'arweave',
    aspectRatio: 'wide',
  },
  {
    url: '#',
    logo: '/images/companies/telegram.png',
    alt: 'telegram',
    aspectRatio: 'square',
  },
  {
    url: '#',
    logo: '/images/companies/solana.png',
    alt: 'onlinezahradnice',
    aspectRatio: 'wide',
  },
  {
    url: '#',
    logo: '/images/companies/point-company.png',
    alt: 'myface',
    aspectRatio: 'square',
  },
  {
    url: '#',
    logo: '/images/companies/langchain-logo.svg',
    alt: 'langchain',
    aspectRatio: 'wide',
  },
];

export const ClientsSection = () => {
  return (
    <section className="my-20 space-y-12 px-4 md:px-10 lg:px-20">
      <h2 className="font-clash-grotesk text-[32px] font-medium leading-[120%] tracking-[0%] sm:text-[48px] md:text-[64px]">
        Projects integrated into the Arrakis AI Ecosystem
      </h2>

      <div className="relative">
        <Marquee className="max-w-full [--duration:80s]">
          <div className="relative mx-auto flex items-center gap-10">
            {[...clients, ...clients].map((logo, idx) => (
              <Link
                href={logo.url}
                target="_blank"
                className="mx-8 inline-block"
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
              >
                <Image
                  src={logo.logo}
                  className={`object-contain ${
                    logo.aspectRatio === 'square'
                      ? 'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-24 lg:w-24 xl:h-28 xl:w-28'
                      : 'h-12 w-32 sm:h-14 sm:w-36 md:h-16 md:w-40 lg:h-24 lg:w-56 xl:h-28 xl:w-64'
                  } `
                    .trim()
                    .replace(/\s+/g, ' ')}
                  alt={logo.alt}
                  width={logo.aspectRatio === 'square' ? 80 : 192}
                  height={80}
                />
              </Link>
            ))}
          </div>
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/4 bg-gradient-to-r from-black dark:from-white/50" />
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/4 bg-gradient-to-l from-black dark:from-white/50" />
      </div>
    </section>
  );
};
