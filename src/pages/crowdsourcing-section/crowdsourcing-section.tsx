'use client';

/* eslint-disable no-magic-numbers */
import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { Button } from 'shared/ui';

export const CrowdsourcingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cometX, setCometX] = useState('-150%');
  const [cometY, setCometY] = useState('-150%');
  const [cometScale, setCometScale] = useState(0.7);
  const [isInView, setIsInView] = useState(false);

  const handleParallax = useCallback(() => {
    if (!sectionRef.current || !isInView) {
      return;
    }
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    const scrollProgress = Math.max(
      0,
      Math.min(
        1,
        (-rect.top + windowHeight * 0.2) / (sectionHeight + windowHeight * 0.4),
      ),
    );

    setCometX(`${-150 + scrollProgress * 300}%`);
    setCometY(`${-150 + scrollProgress * 300 * 2}%`);
    setCometScale(0.7 + scrollProgress * 0.6);
  }, [isInView]);

  useEffect(() => {
    window.addEventListener('scroll', handleParallax);

    return () => window.removeEventListener('scroll', handleParallax);
  }, [handleParallax]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px 300px 0px' },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative my-[100px] px-4 md:px-10 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ x: cometX, y: cometY, scale: cometScale }}
        className="absolute inset-0 top-[50%] z-[-1] rotate-12"
      >
        <Image
          src="/images/comet.svg"
          alt="comet"
          width={1000}
          height={1000}
          className="max-w-[40%] rotate-[deg] opacity-90 md:max-w-[30%]"
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
