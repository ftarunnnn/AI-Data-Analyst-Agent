import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Database,
  FileSpreadsheet,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  BarChart2,
  LineChart,
  Bot,
  Play
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Queries Generated',
      value: '1,428',
      change: '+18.4%',
      trend: 'up',
      icon: Sparkles,
      color: 'indigo',
    },
    {
      title: 'Data Sources Connected',
      value: '4 DBs / CSVs',
      change: '100% Synced',
      trend: 'neutral',
      icon: Database,
      color: 'emerald',
    },
    {
      title: 'Avg Query Runtime',
      value: '142ms',
      change: '-24ms faster',
      trend: 'up',
      icon: Clock,
      color: 'cyan',
    },
    {
      title: 'AI Confidence Score',
      value: '98.6%',
      change: '+1.2%',
      trend: 'up',
      icon: Bot,
      color: 'amber',
    },
  ];

  const recentQueries = [
    {
      id: 'Q-904',
      prompt: 'Show top 5 revenue generating product categories in Q2 2026',
      sql: 'SELECT category, SUM(revenue) AS total_rev FROM sales WHERE quarter = "Q2" GROUP BY category ORDER BY total_rev DESC LIMIT 5;',
      source: 'PostgreSQL - Prod_DB',
      time: '2 mins ago',
      status: 'Success',
      executionTime: '48ms',
    },
    {
      id: 'Q-903',
      prompt: 'Identify customer churn probability by subscription tier',
      sql: 'SELECT tier, AVG(churn_score) FROM customers GROUP BY tier;',
      source: 'BigQuery Warehouses',
      time: '14 mins ago',
      status: 'Success',
      executionTime: '112ms',
    },
    {
      id: 'Q-902',
      prompt: 'Forecast monthly recurring revenue for next 3 quarters',
      sql: 'AI Python Predictive Model (ARIMA/Prophet)',
      source: 'CSV - ARR_Metrics_2026.csv',
      time: '1 hour ago',
      status: 'Success',
      executionTime: '340ms',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/20 p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" dot>
                AI Agent Active • Phase 1 Foundation MVP
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Welcome to Aether AI Data Analyst
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ask questions in plain English. Your AI agent automatically generates optimized SQL, generates interactive charts, and extracts strategic business insights.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="lg"
              icon={<Sparkles className="w-5 h-5" />}
              onClick={() => navigate('/analytics')}
            >
              Start AI Query
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<Database className="w-5 h-5" />}
              onClick={() => navigate('/datasources')}
            >
              Connect Data
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => (
          <Card key={idx} hoverEffect className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {m.title}
              </span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <m.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-100 font-heading">
                {m.value}
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {m.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          Quick AI Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card hoverEffect className="group cursor-pointer" onClick={() => navigate('/analytics')}>
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-base text-slate-100 group-hover:text-indigo-400 transition-colors">
                  Text-to-SQL Generator
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Convert complex questions into ANSI-compliant SQL queries with real-time schema validation and optimization tips.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                Launch Workspace &rarr;
              </div>
            </div>
          </Card>

          <Card hoverEffect className="group cursor-pointer" onClick={() => navigate('/datasources')}>
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                  CSV & Database Explorer
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload CSV files or link PostgreSQL, MySQL, Snowflake, or BigQuery databases to automatically index tables.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                Manage Connectors &rarr;
              </div>
            </div>
          </Card>

          <Card hoverEffect className="group cursor-pointer" onClick={() => navigate('/analytics')}>
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-base text-slate-100 group-hover:text-emerald-400 transition-colors">
                  Auto Chart & Insights
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automatically select optimal chart visualizations (Bar, Line, Pie, Scatter) and generate written executive key takeaways.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                Explore Analytics &rarr;
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Queries Log Feed */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-slate-200">Recent AI Agent Queries</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')}>
            View All Queries
          </Button>
        </div>

        <div className="space-y-3">
          {recentQueries.map((q) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="indigo">{q.id}</Badge>
                  <span className="text-xs text-slate-400">{q.source}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-500">{q.time}</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">{q.prompt}</p>
                <div className="p-2 rounded-lg bg-slate-900/90 font-mono text-xs text-slate-400 overflow-x-auto border border-slate-800">
                  <code>{q.sql}</code>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end">
                <Badge variant="emerald" dot>
                  {q.executionTime}
                </Badge>
                <Button variant="secondary" size="sm" icon={<Play className="w-3.5 h-3.5" />}>
                  Re-run
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
