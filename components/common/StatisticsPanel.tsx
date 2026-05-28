import React from 'react';
import { Card } from '@/components/ui/Card';
import { formatNumber } from '@/utils/formatters';

interface Statistic {
  label: string;
  value: number | string;
  unit?: string;
  description?: string;
  highlight?: boolean;
}

interface StatisticsPanelProps {
  title: string;
  statistics: Statistic[];
  layout?: 'grid' | 'compact';
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  title,
  statistics,
  layout = 'grid',
}) => {
  if (layout === 'compact') {
    return (
      <Card variant="glass">
        <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
        <div className="space-y-3">
          {statistics.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                {stat.description && (
                  <p className="text-xs text-muted-light mt-1">{stat.description}</p>
                )}
              </div>
              <p
                className={`text-right ${
                  stat.highlight ? 'text-primary font-bold' : 'text-foreground'
                }`}
              >
                {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                {stat.unit && <span className="text-xs text-muted-light ml-1">{stat.unit}</span>}
              </p>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statistics.map((stat, idx) => (
          <Card
            key={idx}
            variant="glass"
            className={stat.highlight ? 'border-primary/50 bg-primary/5' : ''}
          >
            <p className="text-sm text-muted-light font-medium">{stat.label}</p>
            <p className={`text-2xl font-bold mt-2 ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
              {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
              {stat.unit && <span className="text-sm text-muted-light ml-2">{stat.unit}</span>}
            </p>
            {stat.description && (
              <p className="text-xs text-muted-light mt-2">{stat.description}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
