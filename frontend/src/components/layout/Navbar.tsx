import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Moon,
  Sun,
  Bell,
  Sparkles,
  Command,
  ChevronRight,
  Database,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return { title: 'Executive Overview', category: 'Dashboard' };
      case '/analytics':
        return { title: 'AI Chat & SQL Studio', category: 'Analytics' };
      case '/datasources':
        return { title: 'Data Connectors', category: 'Integrations' };
      case '/settings':
        return { title: 'System Settings', category: 'Configuration' };
      default:
        return { title: 'Workspace', category: 'Aether' };
    }
  };

  const pageInfo = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-30 h-16 glass-panel border-b border-slate-800/80 px-6 flex items-center justify-between">
      {/* Left Breadcrumb & Page Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span>{pageInfo.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-semibold">{pageInfo.title}</span>
        </div>
      </div>

      {/* Center Command Palette Search Trigger */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Ask AI agent or search datasets, schemas, queries... (Ctrl + K)"
            className="w-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100/90 text-sm text-slate-200 dark:text-slate-200 light:text-slate-800 placeholder-slate-500 pl-10 pr-12 py-2 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            readOnly
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 px-1.5 py-0.5 rounded border border-slate-700">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Dataset Synced Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium">Live DB: E-Commerce Demo</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>

        {/* Notifications Icon */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            AD
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
        </div>
      </div>
    </header>
  );
};
