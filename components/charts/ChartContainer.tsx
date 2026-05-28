'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onExport?: () => void;
  isLoading?: boolean;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  children,
  onExport,
  isLoading = false,
}) => {
  return (
    <Card variant="glass" className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            {description && <p className="text-sm text-muted-light mt-1">{description}</p>}
          </div>
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              disabled={isLoading}
              aria-label="Export chart"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center text-muted-light">
            <div className="animate-pulse">Loading chart...</div>
          </div>
        ) : (
          children
        )}
      </CardBody>
    </Card>
  );
};
