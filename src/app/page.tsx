import Image from 'next/image';

import { HeroSection } from 'pages/hero-section';

const HomePage = () => {
  return (
    <main className="px-4 md:px-10 lg:px-20">
      <Image
        src="/images/earth-bg.svg"
        alt="hero-section"
        width={100}
        height={100}
        className="fixed right-0 top-0 -z-10 w-full opacity-90 md:max-w-[47%]"
      />
      <HeroSection />
    </main>
  );
};

export default HomePage;
