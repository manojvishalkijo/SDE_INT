'use client';

import { useState, useEffect } from 'react';
import { ContentItem } from '@/store/apiSlice';
import { Play, Heart, BookOpen, ExternalLink } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '@/store/userSlice';
import { RootState } from '@/store/store';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroFeedLayoutProps {
  items: ContentItem[];
  emptyMessage?: string;
}

const getPrimaryAction = (type: string) => {
  switch (type) {
    case 'news': return { text: 'Read Article', Icon: BookOpen };
    case 'recommendation': return { text: 'Watch now', Icon: Play };
    case 'social': return { text: 'View Post', Icon: ExternalLink };
    default: return { text: 'Read now', Icon: BookOpen };
  }
};

export default function HeroFeedLayout({ items, emptyMessage = "No content found" }: HeroFeedLayoutProps) {
  const dispatch = useDispatch();
  const bookmarkedItems = useSelector((state: RootState) => state.user.bookmarkedItems);
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      if (!activeItem || !items.find(d => d.id === activeItem.id)) {
        setActiveItem(items[0]);
      }
    } else {
      setActiveItem(null);
    }
  }, [items, activeItem]);

  if (!activeItem) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-slate-500 dark:text-white/50">{emptyMessage}</p>
      </div>
    );
  }

  const remainingItems = items.filter(item => item.id !== activeItem.id).slice(0, 4);
  const isBookmarked = bookmarkedItems.includes(activeItem.id);
  const { text: actionText, Icon: ActionIcon } = getPrimaryAction(activeItem.type);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white dark:bg-[#0A0A0F] transition-colors duration-300">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={activeItem.imageUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000'} 
          alt={activeItem.title} 
          key={activeItem.id}
          className="w-full h-full object-cover opacity-60 dark:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#1E1B29] via-white/80 dark:via-[#1E1B29]/80 to-transparent w-2/3 transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1E1B29] via-white/40 dark:via-[#1E1B29]/40 to-transparent h-full transition-colors duration-300"></div>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-16 max-w-4xl pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[72px] sm:text-[84px] font-black text-slate-900 dark:text-white leading-none mb-6 tracking-tighter drop-shadow-lg">
              {activeItem.title.toUpperCase()}
            </h1>
            
            <p className="text-slate-700 dark:text-white/80 font-medium mb-4 text-lg">
              By {activeItem.source}
            </p>
            
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-800 dark:text-white/90 mb-6">
              <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 backdrop-blur-sm border border-slate-300 dark:border-white/10">{activeItem.category}</span>
              <span>{new Date(activeItem.publishedAt).getFullYear()}</span>
            </div>
            
            <p className="text-slate-600 dark:text-[#A3A0B0] text-base leading-relaxed mb-10 max-w-2xl line-clamp-4">
              {activeItem.description}
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href={activeItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-indigo-600 dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-bold hover:bg-indigo-700 dark:hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 shadow-xl"
              >
                <ActionIcon className="w-5 h-5 fill-current" />
                {actionText}
              </a>
              <button 
                onClick={() => dispatch(toggleBookmark(activeItem.id))}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-slate-800 dark:text-white border border-slate-300 dark:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <Heart className={clsx("w-5 h-5", isBookmarked ? "fill-rose-500 text-rose-500" : "")} />
                {isBookmarked ? "Saved" : "Favorite"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Carousel */}
      <div className="absolute bottom-12 right-12 z-20">
        <div className="flex gap-4">
          <AnimatePresence>
            {remainingItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setActiveItem(item)}
                className={clsx(
                  "relative w-36 h-36 rounded-2xl overflow-hidden cursor-pointer border-[3px] transition-all duration-300 shadow-2xl",
                  "hover:scale-105 hover:-translate-y-2",
                  "border-white/50 dark:border-transparent hover:border-indigo-500 dark:hover:border-white/50"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.imageUrl || `https://source.unsplash.com/random/200x200?sig=${item.id}`} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs font-bold line-clamp-2 leading-tight">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Progress bar mock */}
        <div className="mt-8 flex items-center justify-start gap-2 ml-2">
          <div className="w-12 h-1 bg-slate-400 dark:bg-white rounded-full"></div>
          <div className="w-64 h-1 bg-slate-200 dark:bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
