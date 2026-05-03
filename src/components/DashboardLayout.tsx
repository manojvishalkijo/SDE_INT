import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-[#15131E] font-sans text-slate-900 dark:text-white transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 relative h-screen overflow-hidden py-4 pr-4">
        <main className="h-full w-full relative rounded-[40px] overflow-hidden bg-white dark:bg-[#1E1B29] shadow-2xl transition-colors duration-300 border border-slate-200 dark:border-transparent">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
}
