'use client';

import Image from 'next/image';

import { ClientsSection } from 'pages/clients-section';
import { CrowdsourcingSection } from 'pages/crowdsourcing-section';
import { HeroSection } from 'pages/hero-section';
import { LeaderboardSection } from 'pages/leaderboard-section';
import { MoonSection } from 'pages/moon-section';

const HomePage = () => {
  return (
    <main className="overflow-x-hidden">
      <Image
        src="/images/earth-bg.svg"
        alt="earth"
        width={100}
        height={100}
        className="fixed right-0 top-0 -z-10 w-full opacity-90 md:max-w-[47%]"
      />
      <HeroSection />

      <CrowdsourcingSection />
      <LeaderboardSection />
      <ClientsSection />
      <MoonSection />
    </main>
  );
};

export default HomePage;
