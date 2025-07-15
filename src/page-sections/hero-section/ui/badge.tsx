import { FC } from 'react';

interface BadgeProps {
  title: string;
  value: string | React.ReactNode;
}

export const Badge: FC<BadgeProps> = ({ title, value }) => {
  return (
    <div className="inline-flex w-full max-w-[320px] flex-col items-center justify-center rounded-full bg-[#33130F] px-6 py-4 font-bold text-white opacity-80 shadow-lg sm:max-w-[400px] sm:px-8 sm:py-6 md:max-w-[500px] md:px-10 md:py-7 lg:max-w-[564px] lg:px-12 lg:py-8">
      <div className="text-2xl font-bold leading-none sm:text-3xl md:text-5xl lg:text-4xl">
        {value}
      </div>
      <div className="text-xs font-medium opacity-90 sm:text-sm md:text-lg lg:text-xl">
        {title}
      </div>
    </div>
  );
};
