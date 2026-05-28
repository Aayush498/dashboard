'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAnalysis } from '@/context/AnalysisContext';
import { Header } from '@/components/common/Header';
import { FileUpload } from '@/components/common/FileUpload';
import { MetricCard } from '@/components/common/MetricCard';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ToastContainer } from '@/components/ui/Toast';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { formatNumber, formatDate } from '@/utils/formatters';
import { exportAnalysisAsText, exportAsJSON } from '@/utils/exportUtils';
import {
  Database,
  BarChart3,
  TrendingUp,
  Clock,
  Download,
  Trash2,
  Share2,
} from 'lucide-react';

// Dynamic imports for charts
const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false, loading: () => <div className="h-80 animate-pulse" /> }
);

const BarChart = dynamic(
  () => import('recharts').then((mod) => mod.BarChart),
  { ssr: false, loading: () => <div className="h-80 animate-pulse" /> }
);

const Bar = dynamic(
  () => import('recharts').then((mod) => mod.Bar),
  { ssr: false }
);

const XAxis = dynamic(
  () => import('recharts').then((mod) => mod.XAxis),
  { ssr: false }
);

const YAxis = dynamic(
  () => import('recharts').then((mod) => mod.YAxis),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
);

const PieChart = dynamic(
  () => import('recharts').then((mod) => mod.PieChart),
  { ssr: false }
);

const Pie = dynamic(
  () => import('recharts').then((mod) => mod.Pie),
  { ssr: false }
);

const Cell = dynamic(
  () => import('recharts').then((mod) => mod.Cell),
  { ssr: false }
);

export default function Dashboard() {
  const { currentData, isLoading, metrics, fileHistory, uploadFile, removeFile, notifications, removeNotification } = useAnalysis();
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    await uploadFile(file);
  };

  const handleExportResults = (format: 'text' | 'json') => {
    if (!currentData) return;

    if (format === 'text') {
      exportAnalysisAsText(currentData, 'policy-analysis');
    } else {
      exportAsJSON(currentData, 'policy-analysis');
    }

    notifications.length === 0 &&
      Array.isArray(notifications) === false &&
      console.log('[v0] Export initiated');
  };

  const chartData = currentData?.access_distribution
    ? Object.entries(currentData.access_distribution).map(([key, value]) => ({
        score: key,
        count: value,
      }))
    : [];

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Payer Policy Intelligence"
        subtitle="Analyze healthcare policy data and generate AI-driven insights"
      />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Metrics Section */}
        {metrics && metrics.totalUploads > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              label="Total Uploads"
              value={formatNumber(metrics.totalUploads)}
              icon={<Database className="w-6 h-6" />}
              variant="primary"
            />
            <MetricCard
              label="Total Rows Analyzed"
              value={formatNumber(metrics.totalRows)}
              icon={<BarChart3 className="w-6 h-6" />}
              variant="secondary"
            />
            <MetricCard
              label="Avg. Columns"
              value={Math.round(metrics.averageColumns)}
              icon={<TrendingUp className="w-6 h-6" />}
              variant="success"
            />
            <MetricCard
              label="Last Analyzed"
              value={metrics.lastAnalyzed ? formatDate(metrics.lastAnalyzed) : 'Never'}
              icon={<Clock className="w-6 h-6" />}
              variant="warning"
            />
          </div>
        )}

        {/* File Upload Section */}
        <Card variant="glass" className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold text-foreground">Upload & Analyze</h2>
            <p className="text-muted-light mt-2">
              Upload your CSV or XLSX file containing payer policy data for instant AI-powered analysis
            </p>
          </CardHeader>
          <CardBody>
            <FileUpload
              onFileSelect={handleFileUpload}
              disabled={isLoading}
              isLoading={isLoading}
            />
            {isLoading && (
              <div className="mt-6">
                <LoadingSpinner message="Analyzing your data with AI..." />
              </div>
            )}
          </CardBody>
        </Card>

        {/* Current Analysis Results */}
        {currentData && (
          <div className="space-y-8 animate-fadeIn">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass">
                <CardHeader>
                  <p className="text-sm text-muted-light font-medium">Total Rows</p>
                </CardHeader>
                <CardBody>
                  <h3 className="text-4xl font-bold text-primary">{formatNumber(currentData.total_rows)}</h3>
                  <p className="text-xs text-muted-light mt-2">Records processed</p>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <p className="text-sm text-muted-light font-medium">Total Columns</p>
                </CardHeader>
                <CardBody>
                  <h3 className="text-4xl font-bold text-secondary">{formatNumber(currentData.total_columns)}</h3>
                  <p className="text-xs text-muted-light mt-2">Data dimensions</p>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <p className="text-sm text-muted-light font-medium">Access Categories</p>
                </CardHeader>
                <CardBody>
                  <h3 className="text-4xl font-bold text-accent">
                    {Object.keys(currentData.access_distribution).length}
                  </h3>
                  <p className="text-xs text-muted-light mt-2">Policy categories</p>
                </CardBody>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <ChartContainer
                title="Access Quality Distribution"
                description="Distribution of policies across access categories"
                isLoading={isLoading}
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <XAxis dataKey="score" stroke="var(--muted-light)" />
                      <YAxis stroke="var(--muted-light)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'var(--foreground)' }}
                      />
                      <Bar dataKey="count" fill="var(--primary)" radius={[12, 12, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>

              {/* Pie Chart */}
              <ChartContainer
                title="Policy Distribution"
                description="Percentage breakdown of policies by category"
                isLoading={isLoading}
              >
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="count"
                      >
                        {chartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'var(--foreground)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </div>

            {/* AI Analysis Section */}
            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    AI-Generated Insights
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExportResults('text')}>
                      <Download className="w-4 h-4" />
                      Export as Text
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExportResults('json')}>
                      <Download className="w-4 h-4" />
                      Export as JSON
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {currentData.ai_analysis}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* File History Section */}
        {fileHistory.length > 0 && (
          <Card variant="glass" className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-bold text-foreground">Analysis History</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {fileHistory.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                    onClick={() => setSelectedFileId(selectedFileId === file.id ? null : file.id)}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{file.fileName}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-muted-light">
                          {formatDate(file.uploadDate)}
                        </span>
                        <Badge variant="success" size="sm">
                          {file.status}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      aria-label={`Delete ${file.fileName}`}
                    >
                      <Trash2 className="w-4 h-4 text-error" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Empty State */}
        {!currentData && fileHistory.length === 0 && (
          <Card variant="glass" className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Database className="w-16 h-16 text-muted-light opacity-50" />
              <h3 className="text-xl font-bold text-foreground">No Data Yet</h3>
              <p className="text-muted-light">Upload a file above to start analyzing payer policy data</p>
            </div>
          </Card>
        )}
      </main>

      {/* Toast Notifications */}
      <ToastContainer notifications={notifications} onRemove={removeNotification} />
    </div>
  );
}
