'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur border-b border-border">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-light mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {actions}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="sm" aria-label="Settings">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
