'use client';

import { useSelector } from 'react-redux';
import { useGetPersonalizedFeedQuery } from '@/store/apiSlice';
import { RootState } from '@/store/store';
import { Loader2 } from 'lucide-react';
import HeroFeedLayout from './HeroFeedLayout';

export default function Feed() {
  const categories = useSelector((state: RootState) => state.user.favoriteCategories);
  const search = useSelector((state: RootState) => state.user.searchQuery);
  
  const { data, isLoading } = useGetPersonalizedFeedQuery({ categories, search });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  return <HeroFeedLayout items={data || []} emptyMessage="No content matches your preferences." />;
}
