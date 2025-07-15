import { ContentMoon, Moon } from './ui';

export const MoonSection = () => {
  return (
    <section className="my-20 flex flex-col items-center justify-center space-y-12 px-4 md:flex-row md:gap-40 md:px-10 lg:gap-60 lg:px-20 xl:gap-80">
      <ContentMoon />
      <Moon />
    </section>
  );
};
