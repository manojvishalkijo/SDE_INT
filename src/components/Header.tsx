'use client';

import { Search, Settings2, Plus, Bell, Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchQuery, toggleTheme } from '@/store/userSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.user.theme);
  const initialQuery = useSelector((state: RootState) => state.user.searchQuery);
  
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-8 pointer-events-none">
      <div className="flex-1 pointer-events-auto"></div>
      
      <div className="flex-1 max-w-xl pointer-events-auto">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-white/50 group-focus-within:text-indigo-500 dark:group-focus-within:text-white transition-colors" />
          <input
            type="text"
            placeholder="Search for services"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full bg-white/80 dark:bg-[#1A1721]/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-full py-3.5 pl-14 pr-14 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-white/20 outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 transition-all shadow-lg"
          />
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50 hover:text-slate-700 dark:hover:text-white transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex justify-end items-center gap-4 pointer-events-auto">
        <button 
          onClick={() => dispatch(toggleTheme())}
          className="w-11 h-11 rounded-full bg-white/80 dark:bg-[#1A1721]/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-lg"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="w-11 h-11 rounded-full bg-white/80 dark:bg-[#1A1721]/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
        </button>
        <button className="w-11 h-11 rounded-full bg-white/80 dark:bg-[#1A1721]/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-lg">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/50 dark:border-white/10 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
}
