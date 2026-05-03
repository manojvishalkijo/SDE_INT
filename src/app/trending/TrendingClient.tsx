'use client';

import { useGetTrendingContentQuery } from '@/store/apiSlice';
import HeroFeedLayout from '@/components/HeroFeedLayout';
import { Loader2 } from 'lucide-react';

export default function TrendingClient() {
  const { data, isLoading } = useGetTrendingContentQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-[#0A0A0F]">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  return <HeroFeedLayout items={data || []} emptyMessage="No trending content available at the moment." />;
}
