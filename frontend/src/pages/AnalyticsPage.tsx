import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Code2,
  Table as TableIcon,
  BarChart,
  Bot,
  Copy,
  Check,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const AnalyticsPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const sampleSQL = `SELECT 
    p.category_name,
    COUNT(o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_revenue
FROM orders o
JOIN products p ON o.product_id = p.product_id
WHERE o.order_date >= '2026-01-01'
GROUP BY p.category_name
ORDER BY total_revenue DESC
LIMIT 5;`;

  const sampleData = [
    { category: 'Enterprise Software', orders: '1,240', revenue: '$482,900.00' },
    { category: 'Cloud Storage & API', orders: '3,890', revenue: '$312,450.50' },
    { category: 'AI Microservices', orders: '2,110', revenue: '$294,100.00' },
    { category: 'Security & Compliance', orders: '840', revenue: '$189,600.00' },
    { category: 'Data Pipeline Tools', orders: '1,560', revenue: '$142,300.00' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-7rem)]">
      {/* Left Chat History Panel */}
      <div className="lg:col-span-1 glass-panel rounded-2xl p-4 flex flex-col space-y-4 border border-slate-800/80">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Saved Conversations
          </span>
          <Badge variant="indigo">+ New Thread</Badge>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {[
            'Top Revenue Categories Q2',
            'Customer Retention Analysis',
            'ARR Growth Forecast 2026',
            'SQL Query Optimization',
            'SaaS Churn cohort by tier',
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                idx === 0
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
        {/* Chat Thread Container */}
        <div className="flex-1 space-y-5 overflow-y-auto pr-1">
          {/* User Prompt Message */}
          <div className="flex items-start justify-end gap-3">
            <div className="max-w-xl p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-slate-100 text-sm">
              Show me the top 5 product categories by revenue since Jan 2026, along with order counts.
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              AD
            </div>
          </div>

          {/* AI Response Card */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-4">
              <Card className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="indigo" dot>
                      Query Executed in 48ms
                    </Badge>
                    <Badge variant="emerald">Confidence 99%</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} onClick={handleCopy}>
                      {copied ? 'Copied' : 'Copy SQL'}
                    </Button>
                  </div>
                </div>

                {/* Generated SQL Code Box */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span>Generated SQL Query</span>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-indigo-200 border border-slate-800 overflow-x-auto">
                    <code>{sampleSQL}</code>
                  </pre>
                </div>

                {/* Formatted Data Table */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <TableIcon className="w-4 h-4 text-cyan-400" />
                    <span>Data Result Preview (5 rows)</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                        <tr>
                          <th className="p-3">Category Name</th>
                          <th className="p-3">Total Orders</th>
                          <th className="p-3">Total Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                        {sampleData.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3 font-medium text-slate-200">{row.category}</td>
                            <td className="p-3 text-slate-400">{row.orders}</td>
                            <td className="p-3 text-emerald-400 font-semibold">{row.revenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="space-y-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question about your database in natural language..."
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 pl-4 pr-24 py-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xl"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <Button variant="primary" size="sm" icon={<Send className="w-4 h-4" />}>
                Send
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1">
            <span className="shrink-0 font-medium">Suggestions:</span>
            {['Show customer churn rate', 'Forecast Q3 Sales', 'Find top 10 buyers'].map((sug, i) => (
              <button
                key={i}
                onClick={() => setPrompt(sug)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
