import Link from 'next/link';

import { Button } from 'shared/ui';

export const Header = () => {
  return (
    <header className="mx-auto mt-8 flex max-w-7xl items-center justify-center gap-12">
      <Link href="/" className="text-[18px]">
        LLM Leaderboard
      </Link>
      <Button>Buy Spice AI</Button>
    </header>
  );
};
