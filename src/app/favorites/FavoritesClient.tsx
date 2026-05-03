'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetPersonalizedFeedQuery } from '@/store/apiSlice';
import HeroFeedLayout from '@/components/HeroFeedLayout';
import { Loader2 } from 'lucide-react';

export default function FavoritesClient() {
  const bookmarkedItems = useSelector((state: RootState) => state.user.bookmarkedItems);
  const { data, isLoading } = useGetPersonalizedFeedQuery({ categories: [] });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-[#0A0A0F]">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  const favoriteItems = (data || []).filter(item => bookmarkedItems.includes(item.id));

  return <HeroFeedLayout items={favoriteItems} emptyMessage="No favorites yet. Click the heart icon on any card to save it here." />;
}
