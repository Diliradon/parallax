'use client';

import { Badge } from 'pages/hero-section/ui';
import { BlurText, Button, CountUp, ShinyText } from 'shared/ui';

export const HeroSection = () => {
  return (
    <section className="mx-auto mt-[100px] flex flex-col items-start justify-center gap-[36px] px-4">
      <BlurText
        text="A new economic primitive for funding decentralized AI"
        className="bg-gradient-to-r from-[#B53EA4] via-[#FC6F32] to-[#FF4A] bg-clip-text font-clash-grotesk text-[32px] font-medium leading-[120%] tracking-[0%] text-transparent sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px]"
      />
      <ShinyText
        className="font-inter text-2xl"
        text="Spice AI is a decentralized AI funding platform that allows you to
        invest in AI projects and earn rewards."
      />
      <Button className="w-full md:max-w-[240px]">Buy Spice AI</Button>

      <div className="grid w-full grid-cols-1 gap-[34px] sm:grid-cols-2 md:grid-cols-3">
        <Badge
          title="LLM models"
          value={
            <CountUp
              to={10873}
              from={0}
              direction="up"
              delay={0}
              duration={2}
              startWhen
              className=""
              separator=""
              onStart={() => {}}
              onEnd={() => {}}
            />
          }
        />
        <Badge title="paid to data scientists" value="$72,470,728" />
        <Badge
          title="members"
          value={
            <CountUp
              to={6557}
              from={0}
              direction="up"
              delay={0}
              duration={2}
              startWhen
              className=""
              separator=""
              onStart={() => {}}
              onEnd={() => {}}
            />
          }
        />
      </div>
    </section>
  );
};
