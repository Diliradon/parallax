import { Button } from 'shared/ui';

export const ContentMoon = () => {
  return (
    <div className="space-y-8">
      <h2 className="font-clash-grotesk text-[32px] font-medium leading-[120%] tracking-[0%] md:text-[48px]">
        Text here
      </h2>
      <p className="font-clash-grotesk text-[20px] font-normal leading-[150%] tracking-[0%] md:text-[24px]">
        Every month, we run a competition between all the AI models submitted on
        a leaderboard. The best model will be featured and will earn tokens.
      </p>
      <Button>Read Whitepaper</Button>
    </div>
  );
};
