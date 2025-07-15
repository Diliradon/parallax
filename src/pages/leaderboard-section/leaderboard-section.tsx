/* eslint-disable no-magic-numbers */
import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { cn } from 'shared/lib';
import { Button } from 'shared/ui';

type TrendType = 'up' | 'down' | 'neutral';

interface LeaderboardRow {
  rank: number;
  modelName: string;
  trend: TrendType;
  average: number;
  arc: number;
  hellaSwag: number;
  mmlu: number;
  truthfulQA: number;
  winogrande: number;
  gsm8k: number;
  earnings: number;
}

// Generate 110 mock items with varied data
const generateLeaderboardData = (): LeaderboardRow[] => {
  const trends: TrendType[] = ['up', 'down', 'neutral'];
  const modelNames = [
    'GPT-4-Turbo',
    'Claude-3.5-Sonnet',
    'Gemini-Pro-1.5',
    'LLaMA-3-70B',
    'Mixtral-8x7B',
    'PaLM-2-Large',
    'Anthropic-Claude',
    'OpenAI-GPT-3.5',
    'Cohere-Command',
    'AI21-Jurassic',
    'Meta-LLaMA-2',
    'Google-Bard',
    'Microsoft-Orca',
    'Stability-Beluga',
    'Together-RedPajama',
  ];

  return Array.from({ length: 110 }, (_, index) => {
    const rank = index + 1;
    const baseScore = Math.max(50, 95 - rank * 0.3 + (Math.random() * 10 - 5));
    const variance = () => baseScore + (Math.random() * 6 - 3);

    return {
      rank,
      modelName: `${modelNames[index % modelNames.length]}-${Math.floor(index / modelNames.length) + 1}`,
      trend: trends[Math.floor(Math.random() * trends.length)],
      average: Number(baseScore.toFixed(2)),
      arc: Number(variance().toFixed(2)),
      hellaSwag: Number(variance().toFixed(2)),
      mmlu: Number(variance().toFixed(2)),
      truthfulQA: Number(variance().toFixed(2)),
      winogrande: Number(variance().toFixed(2)),
      gsm8k: Number(variance().toFixed(2)),
      earnings: Math.floor(
        Math.max(
          100000,
          3000000 - rank * 15000 + (Math.random() * 500000 - 250000),
        ),
      ),
    };
  });
};

const TrendIndicator = ({ trend }: { trend: TrendType }) => {
  if (trend === 'up') {
    return (
      <Image
        src="/icons/arrow-up.svg"
        alt="arrow-up"
        width={24}
        height={24}
        className="mx-auto"
      />
    );
  }
  if (trend === 'down') {
    return (
      <Image
        src="/icons/arrow-down.svg"
        alt="arrow-down"
        width={24}
        height={24}
        className="mx-auto"
      />
    );
  }

  return <span className="text-lg text-gray-400">—</span>;
};

export const LeaderboardSection = () => {
  const [allData] = useState<LeaderboardRow[]>(generateLeaderboardData());
  const [displayedItems, setDisplayedItems] = useState(10);
  const [showViewMoreButton, setShowViewMoreButton] = useState(true);
  const [isScrollableMode, setIsScrollableMode] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleViewMore = () => {
    setDisplayedItems(110); // Load all 110 items
    setShowViewMoreButton(false); // Hide the button
    setIsScrollableMode(true); // Enable scrollable mode
  };

  const handleScroll = useCallback(() => {
    if (!isScrollableMode || !tableContainerRef.current) {
      return;
    }

    const container = tableContainerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;
    const scrollPosition = scrollTop + clientHeight;

    // Load more when near bottom (within 100px)
    if (
      scrollPosition >= scrollHeight - 100 &&
      displayedItems < allData.length
    ) {
      setDisplayedItems(prev => Math.min(prev + 20, allData.length));
    }
  }, [isScrollableMode, displayedItems, allData.length]);

  useEffect(() => {
    if (isScrollableMode && tableContainerRef.current) {
      const container = tableContainerRef.current;

      container.addEventListener('scroll', handleScroll);

      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isScrollableMode]);

  const visibleData = allData.slice(0, displayedItems);

  return (
    <section className="space-y-8 py-10">
      <div className="mb-6 flex flex-col items-center justify-between gap-6 md:flex-row">
        <h2 className="text-center text-3xl font-bold text-white">
          LLM Leaderboard
        </h2>
        <Button>Submit your model</Button>
      </div>
      <p className="font-inter text-[20px]">
        We evaluate LLMs on key benchmarks using the Eleuther AI, a framework to
        test LLMs on a large number of different evaluation tasks. The higher
        the score, the better the LLM.
      </p>
      <div
        ref={tableContainerRef}
        className={cn(
          'overflow-x-auto',
          isScrollableMode && 'max-h-[600px] overflow-y-auto',
        )}
      >
        <table className="w-full border-collapse text-sm text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-3 py-3 text-center font-medium text-transparent">
                .
              </th>
              <th className="w-16 px-3 py-3 text-center font-medium text-gray-300">
                #
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-300">
                Model Name
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-300">
                Average
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-300">
                ARC
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-300">
                HellaSwag
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-300">
                MMLU
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-300">
                TruthfulQA
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-300">
                Winogrande
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-300">
                GSM8K
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-300">
                Earnings
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, index) => (
              <tr
                key={row.rank}
                className={`border-b border-gray-800 transition-colors hover:bg-gray-900/50 ${
                  index % 2 === 1 ? 'bg-[#C9D9FF14]' : ''
                }`}
              >
                <td className="px-3 py-4 text-center">
                  <TrendIndicator trend={row.trend} />
                </td>
                <td className="px-3 py-4 text-center font-medium">
                  {row.rank}
                </td>
                <td className="px-4 py-4 font-medium">{row.modelName}</td>
                <td className="px-4 py-4 text-center">{row.average}</td>
                <td className="px-4 py-4 text-center">{row.arc}</td>
                <td className="px-4 py-4 text-center">{row.hellaSwag}</td>
                <td className="px-4 py-4 text-center">{row.mmlu}</td>
                <td className="px-4 py-4 text-center">{row.truthfulQA}</td>
                <td className="px-4 py-4 text-center">{row.winogrande}</td>
                <td className="px-4 py-4 text-center">{row.gsm8k}</td>
                <td className="px-4 py-4 text-right">
                  {row.earnings.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isScrollableMode && displayedItems < allData.length && (
          <div className="flex justify-center bg-gray-900/50 py-4">
            <div className="text-sm text-gray-400">
              Loading more items... ({displayedItems}/{allData.length})
            </div>
          </div>
        )}
      </div>

      {showViewMoreButton && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleViewMore}
            className="text-sm text-gray-400"
          >
            View More
          </button>
        </div>
      )}

      {isScrollableMode && displayedItems >= allData.length && (
        <div className="mt-4 flex justify-center">
          <div className="text-sm text-gray-400">
            All {allData.length} items loaded
          </div>
        </div>
      )}
      <div className="relative z-10 flex w-fit flex-col items-center justify-center gap-[-2px]">
        <Image
          src="/images/space-x.png"
          alt="space-x"
          width={200}
          height={200}
          className="object-cover"
          priority
        />
        <Image
          src="/images/fire.png"
          alt="fire"
          width={20}
          height={20}
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};
