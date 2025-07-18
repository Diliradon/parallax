'use client';

/* eslint-disable no-magic-numbers */
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import { cn } from 'shared/lib';

const buildKeyframes = (from: any, steps: any) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s: any) => Object.keys(s)),
  ]);

  const keyframes: any = {};

  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map((s: any) => s[k])];
  });

  return keyframes;
};

export interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  tag?: keyof JSX.IntrinsicElements;
}

export const BlurText: FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
  tag = 'p',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, idx) =>
    stepCount === 1 ? 0 : idx / (stepCount - 1),
  );

  const Component = tag as any;

  return (
    <Component ref={ref} className={cn(className, 'flex w-full flex-wrap')}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: any = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        const uniqueKey = `${segment}-${index}-${Date.now()}`;

        return (
          <motion.span
            className={cn(
              // 'inline-block will-change-[transform,filter,opacity]',
              className,
            )}
            key={uniqueKey}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Component>
  );
};
