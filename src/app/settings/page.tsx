'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleCategory } from '@/store/userSlice';
import { Check, Info } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'Technology', label: 'Technology', description: 'Latest gadgets, software, and AI news' },
  { id: 'Movies', label: 'Movies & TV', description: 'Recommendations from cinema and streaming' },
  { id: 'Trending', label: 'Trending Social', description: 'What everyone is talking about right now' },
  { id: 'Finance', label: 'Finance', description: 'Markets, crypto, and economic updates' },
  { id: 'Sports', label: 'Sports', description: 'Scores, highlights, and team news' },
];

export default function Settings() {
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state: RootState) => state.user.favoriteCategories);

  return (
    <div className="h-full w-full bg-white dark:bg-[#0A0A0F] pt-32 px-10 md:px-20 overflow-y-auto transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Content Preferences</h2>
          <p className="text-slate-500 dark:text-[#8A8796] text-lg">
            Personalize your dashboard by selecting the categories you want to follow.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex gap-4 items-start backdrop-blur-md">
          <Info className="w-6 h-6 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">
            Your feed relies on these preferences to curate content across News, Social, and Recommendations. Everything is saved automatically to your profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, index) => {
            const isSelected = selectedCategories.includes(cat.id);
            
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => dispatch(toggleCategory(cat.id))}
                className={clsx(
                  "flex items-center text-left p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group",
                  isSelected 
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.15)]" 
                    : "border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20"
                )}
              >
                <div className="flex-1">
                  <h3 className={clsx(
                    "text-xl font-bold mb-2 transition-colors",
                    isSelected ? "text-indigo-600 dark:text-indigo-300" : "text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200"
                  )}>
                    {cat.label}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-[#8A8796]">
                    {cat.description}
                  </p>
                </div>
                
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-6 transition-all duration-300",
                  isSelected 
                    ? "bg-indigo-500 text-white scale-110" 
                    : "bg-slate-200 dark:bg-white/10 text-transparent"
                )}>
                  <Check className="w-5 h-5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
