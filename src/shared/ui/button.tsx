import * as React from 'react';

import { cn } from 'shared/lib';

export const Button = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#963488] via-[#FC6F32] to-[#FF4A59] p-[2px]',
        className,
      )}
      {...props}
    >
      <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-black px-6 py-4 text-[18px] text-white transition-colors hover:bg-gray-900/50">
        {props.children}
      </span>
    </button>
  );
};
