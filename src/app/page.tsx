'use client';

import Image from 'next/image';

import { ClientsSection } from 'pages/clients-section';
import { CrowdsourcingSection } from 'pages/crowdsourcing-section';
import { HeroSection } from 'pages/hero-section';
import { LeaderboardSection } from 'pages/leaderboard-section';

const HomePage = () => {
  return (
    <main className="">
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
    </main>
  );
};

export default HomePage;
