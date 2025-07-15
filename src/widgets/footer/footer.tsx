'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="relative h-[300px] space-y-[27px] bg-[url('/images/footer-bg.png')] bg-cover bg-center px-4 md:px-10 lg:px-20">
      <nav className="flex items-center justify-center gap-4 pt-20 md:pt-12">
        <ul className="flex items-center justify-center gap-4 font-semibold text-white">
          <li>
            <Link href="#home">Home</Link>
          </li>
          <li>
            <Link href="#leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link href="#about">About</Link>
          </li>
        </ul>
      </nav>
      <hr className="border-[#8E8E8E]" />
      <div className="mt-4 flex flex-col items-center gap-4 text-white md:flex-row md:justify-between">
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full bg-[#8E8E8E]" />
          <div className="h-8 w-8 rounded-full bg-[#8E8E8E]" />
          <div className="h-8 w-8 rounded-full bg-[#8E8E8E]" />
        </div>
        <div className="flex gap-4 text-sm text-[#8E8E8E]">
          <Link href="#">Terms of Use</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};
