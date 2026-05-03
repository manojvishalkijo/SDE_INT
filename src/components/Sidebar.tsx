'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, Heart, Settings } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Feed', href: '/', icon: Home },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Favorites', href: '/favorites', icon: Heart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-slate-100 dark:bg-[#15131E] text-slate-600 dark:text-slate-300 hidden md:flex flex-col h-full overflow-y-auto z-20 shrink-0 border-none transition-colors duration-300">
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-tight">PCD.</h1>
        <p className="text-[10px] font-bold text-slate-500 dark:text-[#8A8796] mt-1 tracking-widest uppercase">Content Dashboard</p>
      </div>
      
      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 text-[15px]",
                isActive 
                  ? "text-indigo-600 dark:text-white font-semibold bg-indigo-50 dark:bg-white/10 shadow-sm" 
                  : "text-slate-500 dark:text-[#8A8796] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5"
              )}
            >
              <item.icon className={clsx("w-5 h-5", isActive ? "stroke-indigo-600 dark:stroke-white" : "stroke-slate-500 dark:stroke-[#8A8796]")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-200 dark:border-white/5 m-4 rounded-2xl bg-white dark:bg-white/5 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
            U
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-white">User</p>
            <p className="text-[10px] font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Pro Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
