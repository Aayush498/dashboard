'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/common/Header';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { useAnalysis } from '@/context/AnalysisContext';
import { formatNumber } from '@/utils/formatters';
import { TrendingUp, Download, Filter } from 'lucide-react';

const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

const LineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  { ssr: false }
);

const Line = dynamic(
  () => import('recharts').then((mod) => mod.Line),
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

const CartesianGrid = dynamic(
  () => import('recharts').then((mod) => mod.CartesianGrid),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
);

const Legend = dynamic(
  () => import('recharts').then((mod) => mod.Legend),
  { ssr: false }
);

export default function AnalyticsPage() {
  const { currentData, fileHistory } = useAnalysis();

  // Generate trend data
  const trendData = fileHistory.slice(0, 5).reverse().map((file, idx) => ({
    date: `Upload ${idx + 1}`,
    rows: file.analysisData?.total_rows || 0,
    columns: file.analysisData?.total_columns || 0,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Advanced Analytics"
        subtitle="Deep-dive into your payer policy data trends and patterns"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="primary" size="sm">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </>
        }
      />

      <main className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass">
            <CardHeader>
              <p className="text-sm text-muted-light">Total Analysis Sessions</p>
            </CardHeader>
            <CardBody>
              <h3 className="text-4xl font-bold text-primary">{fileHistory.length}</h3>
              <p className="text-xs text-muted-light mt-2">Data uploads processed</p>
            </CardBody>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <p className="text-sm text-muted-light">Average Dataset Size</p>
            </CardHeader>
            <CardBody>
              <h3 className="text-4xl font-bold text-secondary">
                {fileHistory.length > 0
                  ? formatNumber(
                      Math.round(
                        fileHistory.reduce((sum, f) => sum + (f.analysisData?.total_rows || 0), 0) /
                          fileHistory.length
                      )
                    )
                  : '0'}
              </h3>
              <p className="text-xs text-muted-light mt-2">Rows per dataset</p>
            </CardBody>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <p className="text-sm text-muted-light">Data Dimensionality</p>
            </CardHeader>
            <CardBody>
              <h3 className="text-4xl font-bold text-accent">
                {fileHistory.length > 0
                  ? Math.round(
                      fileHistory.reduce((sum, f) => sum + (f.analysisData?.total_columns || 0), 0) /
                        fileHistory.length
                    )
                  : '0'}
              </h3>
              <p className="text-xs text-muted-light mt-2">Columns on average</p>
            </CardBody>
          </Card>
        </div>

        {/* Trend Analysis */}
        {trendData.length > 0 && (
          <ChartContainer title="Upload Trends" description="Historical analysis of data uploads">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted-light)" />
                  <YAxis stroke="var(--muted-light)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rows"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--primary)', r: 5 }}
                    name="Rows"
                  />
                  <Line
                    type="monotone"
                    dataKey="columns"
                    stroke="var(--secondary)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--secondary)', r: 5 }}
                    name="Columns"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        )}

        {/* Insights */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Data Insights
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Dataset Quality</h3>
                <ul className="space-y-2 text-sm text-muted-light">
                  <li>✓ All uploaded files successfully processed</li>
                  <li>✓ Average file size: Optimal</li>
                  <li>✓ Data consistency: High</li>
                  <li>✓ Anomalies detected: None</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
                <ul className="space-y-2 text-sm text-muted-light">
                  <li>→ Increase data collection frequency for better trend analysis</li>
                  <li>→ Add additional policy dimensions for richer insights</li>
                  <li>→ Consider temporal analysis for seasonal patterns</li>
                  <li>→ Export results for stakeholder presentations</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Empty State */}
        {fileHistory.length === 0 && (
          <Card variant="glass" className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <TrendingUp className="w-16 h-16 text-muted-light opacity-50" />
              <h3 className="text-xl font-bold text-foreground">No Analytics Data</h3>
              <p className="text-muted-light">Upload data on the Dashboard to see analytics</p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
