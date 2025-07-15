'use client';

/* eslint-disable no-magic-numbers */
import { useRef } from 'react';

import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

import { Button } from 'shared/ui';

export const CrowdsourcingSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['0 1', '1 0'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['-150%', '150%']);
  const y = useTransform(scrollYProgress, [0, 1], ['-32%', '32%']);
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1.3]);

  return (
    <section
      ref={sectionRef}
      className="mb-30 relative mt-[100px] px-6 md:mb-[500px] lg:mb-[700px]"
    >
      <motion.div style={{ x, y, scale }} className="absolute inset-0 z-[-1]">
        <Image
          src="/images/comet.svg"
          alt="comet"
          width={1000}
          height={1000}
          className="max-w-[40%] rotate-12 opacity-90 md:max-w-[30%]"
        />
      </motion.div>
      <div className="relative z-10 flex flex-col items-start justify-center gap-8">
        <h2 className="font-clash-grotesk text-[32px] font-medium leading-[120%] tracking-[0%] sm:text-[48px] md:text-[64px]">
          Crowdsourcing our collective intelligence to build the best AI
        </h2>
        <p className="font-inter text-2xl">
          Open source AIs have been lagging in development behind OpenAI with
          billions of dollars. <br /> We run competitions between AI models to
          find and pay for the best AI model. <br /> Users will be able to
          access the best AI models.
        </p>
        <Button>Use the cutting edge AI</Button>
      </div>
    </section>
  );
};
