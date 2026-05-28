import React from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  description?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

const variantStyles = {
  primary: 'bg-primary/10 border-primary/20',
  secondary: 'bg-secondary/10 border-secondary/20',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
};

const iconVariantStyles = {
  primary: 'bg-primary/20 text-primary',
  secondary: 'bg-secondary/20 text-secondary',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  description,
  variant = 'primary',
}) => {
  return (
    <Card variant="glass" className={`relative overflow-hidden ${variantStyles[variant]}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-light">{label}</p>
            <h3 className="text-3xl font-bold text-foreground mt-1">{value}</h3>
          </div>
          {icon && (
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconVariantStyles[variant]}`}>
              {icon}
            </div>
          )}
        </div>

        {description && (
          <p className="text-xs text-muted-light mb-3">{description}</p>
        )}

        {trend && (
          <div className="flex items-center gap-2">
            {trend.direction === 'up' ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-error" />
            )}
            <span
              className={
                trend.direction === 'up'
                  ? 'text-success text-sm font-medium'
                  : 'text-error text-sm font-medium'
              }
            >
              {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            <span className="text-muted-light text-xs">vs last period</span>
          </div>
        )}
      </div>

      {/* Background accent */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none ${
          variant === 'primary'
            ? 'bg-primary'
            : variant === 'secondary'
            ? 'bg-secondary'
            : variant === 'success'
            ? 'bg-success'
            : 'bg-warning'
        }`}
      />
    </Card>
  );
};
