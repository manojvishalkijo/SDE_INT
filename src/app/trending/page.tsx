'use client';

import dynamic from 'next/dynamic';

const TrendingClient = dynamic(() => import('./TrendingClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-[#0A0A0F]">
      <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
    </div>
  )
});

export default function Trending() {
  return (
    <div className="w-full h-full">
      <TrendingClient />
    </div>
  );
}
