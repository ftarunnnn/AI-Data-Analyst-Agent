import React from 'react';
import { Settings, Cpu, Key, Shield, Palette, Server } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">System Settings & Configuration</h1>
        <p className="text-slate-400 text-sm">
          Configure your AI model routing, database credentials, security parameters, and theme preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Settings Sidebar Tabs */}
        <Card className="lg:col-span-1 space-y-2">
          {[
            { label: 'AI Model & Reasoning', icon: Cpu, active: true },
            { label: 'API Keys & Secrets', icon: Key },
            { label: 'Appearance & Theme', icon: Palette },
            { label: 'Security & Access', icon: Shield },
            { label: 'Server & Execution', icon: Server },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <item.icon className="w-4 h-4 text-indigo-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </Card>

        {/* Right Settings Detail Card */}
        <Card className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Primary AI Model Provider
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/40 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-100">Gemini 1.5 Pro</span>
                  <Badge variant="indigo">Default</Badge>
                </div>
                <p className="text-xs text-slate-400">High speed SQL generation & chart reasoning.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-100">GPT-4o</span>
                  <Badge variant="slate">Available</Badge>
                </div>
                <p className="text-xs text-slate-400">Complex multi-step Python analytics execution.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Palette className="w-5 h-5 text-indigo-400" />
              Theme Appearance
            </h2>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <span className="font-medium text-sm text-slate-200">Current Theme</span>
                <p className="text-xs text-slate-400">Toggle between dark obsidian and bright light modes.</p>
              </div>
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <Button variant="primary">Save Preferences</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
