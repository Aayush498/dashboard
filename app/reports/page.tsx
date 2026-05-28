'use client';

import React, { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAnalysis } from '@/context/AnalysisContext';
import { formatDate } from '@/utils/formatters';
import { FileText, Share2, Trash2, Plus, Eye, Download } from 'lucide-react';

const mockReports = [
  {
    id: '1',
    name: 'Q1 Policy Analysis Report',
    description: 'Comprehensive analysis of payer policies in Q1',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    format: 'PDF',
    status: 'completed',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Competitive Intelligence Summary',
    description: 'Market comparison and competitive positioning',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    format: 'XLSX',
    status: 'completed',
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Access Restriction Analysis',
    description: 'Deep-dive into policy access restrictions',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    format: 'PDF',
    status: 'completed',
    size: '3.1 MB',
  },
];

export default function ReportsPage() {
  const { fileHistory } = useAnalysis();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Reports Library"
        subtitle="Generate, manage, and share custom payer policy reports"
        actions={
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            New Report
          </Button>
        }
      />

      <main className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass">
            <CardHeader>
              <p className="text-sm text-muted-light">Total Reports</p>
            </CardHeader>
            <CardBody>
              <h3 className="text-4xl font-bold text-primary">{mockReports.length}</h3>
              <p className="text-xs text-muted-light mt-2">Generated reports</p>
            </CardBody>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <p className="text-sm text-muted-light">This Month</p>
            </CardHeader>
            <CardBody>
              <h3 className="text-4xl font-bold text-secondary">{Math.max(1, mockReports.length)}</h3>
              <p className="text-xs text-muted-light mt-2">New reports</p>
            </CardBody>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <p className="text-sm text-muted-light">Total Size</p>
            </CardHeader>
            <CardBody>
              <h3 className="text-4xl font-bold text-accent">7.3 MB</h3>
              <p className="text-xs text-muted-light mt-2">Storage used</p>
            </CardBody>
          </Card>
        </div>

        {/* Reports List */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-2xl font-bold text-foreground">Generated Reports</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {mockReports.length > 0 ? (
                mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-5 border border-border rounded-lg hover:border-primary transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{report.name}</h3>
                          <p className="text-sm text-muted-light mt-1">{report.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <Badge variant="info" size="sm">
                              {report.format}
                            </Badge>
                            <Badge variant="success" size="sm">
                              {report.status}
                            </Badge>
                            <span className="text-xs text-muted-light">{report.size}</span>
                            <span className="text-xs text-muted-light">
                              {formatDate(report.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" title="View report">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Download report">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Share report">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete report">
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-light opacity-50 mx-auto mb-3" />
                  <p className="text-muted-light">No reports generated yet</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Report Templates */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Executive Summary',
                description: 'High-level overview for stakeholders',
                icon: '📊',
              },
              {
                name: 'Detailed Analysis',
                description: 'Complete data analysis and insights',
                icon: '📈',
              },
              {
                name: 'Comparison Report',
                description: 'Side-by-side policy comparison',
                icon: '🔄',
              },
              {
                name: 'Trend Analysis',
                description: 'Historical trends and projections',
                icon: '📉',
              },
              {
                name: 'Risk Assessment',
                description: 'Policy risk evaluation',
                icon: '⚠️',
              },
              {
                name: 'Custom Report',
                description: 'Build your own report',
                icon: '⚙️',
              },
            ].map((template) => (
              <Card key={template.name} variant="glass" className="hover:border-primary cursor-pointer">
                <CardBody>
                  <div className="text-4xl mb-3">{template.icon}</div>
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <p className="text-sm text-muted-light mt-2">{template.description}</p>
                </CardBody>
                <CardFooter>
                  <Button variant="primary" size="sm" fullWidth>
                    Create
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
