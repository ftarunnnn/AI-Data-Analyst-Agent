import React from 'react';
import {
  Database,
  FileSpreadsheet,
  Plus,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  Globe,
  Layers,
  Settings2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const DataSourcesPage: React.FC = () => {
  const sources = [
    {
      name: 'PostgreSQL - Main Production',
      type: 'Database',
      tables: '24 Tables • 4.2M Rows',
      status: 'Connected',
      lastSync: 'Synced 3m ago',
      icon: Database,
      badge: 'Active',
    },
    {
      name: 'Snowflake Analytics Warehouse',
      type: 'Data Warehouse',
      tables: '84 Tables • 120M Rows',
      status: 'Connected',
      lastSync: 'Synced 15m ago',
      icon: Layers,
      badge: 'Active',
    },
    {
      name: 'Q2_Revenue_Metrics_2026.csv',
      type: 'File Upload',
      tables: '1 Table • 12,400 Rows',
      status: 'Indexed',
      lastSync: 'Uploaded today',
      icon: FileSpreadsheet,
      badge: 'CSV',
    },
    {
      name: 'Stripe Billing REST API',
      type: 'REST Connector',
      tables: '4 Endpoints',
      status: 'Idle',
      lastSync: 'Scheduled',
      icon: Globe,
      badge: 'API',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Data Connectors & Sources</h1>
          <p className="text-slate-400 text-sm">
            Manage database connections, vector schemas, and CSV file uploads for your AI Agent.
          </p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
          Connect New Source
        </Button>
      </div>

      {/* Grid of Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sources.map((src, i) => (
          <Card key={i} hoverEffect className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <src.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">{src.name}</h3>
                  <span className="text-xs text-slate-400">{src.type}</span>
                </div>
              </div>
              <Badge variant={src.status === 'Connected' ? 'emerald' : 'indigo'} dot>
                {src.status}
              </Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{src.tables}</span>
              <span className="text-slate-500">{src.lastSync}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <Button variant="ghost" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
                Re-sync Schema
              </Button>
              <Button variant="outline" size="sm" icon={<Settings2 className="w-3.5 h-3.5" />}>
                Configure
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
