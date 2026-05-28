'use client';

import React from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { Sparkles, BarChart3, FileText, Settings, HelpCircle } from 'lucide-react';
import { NavigationItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      href: '/',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: 'Reports',
      href: '/reports',
      icon: <FileText className="w-5 h-5" />,
      badge: 3,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <Settings className="w-5 h-5" />,
    },
    {
      label: 'Help',
      href: '/help',
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  const sidebarFooter = (
    <div className="space-y-3">
      <Button variant="ghost" size="sm" className="w-full justify-start" fullWidth>
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        items={navigationItems}
        logo={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">PolicyAI</span>
          </div>
        }
        footer={sidebarFooter}
      />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
