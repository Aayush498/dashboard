'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ChevronRight, Menu, X } from 'lucide-react';
import { NavigationItem } from '@/types';

interface SidebarProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, logo, footer }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsMobileOpen(false);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-40 md:hidden bg-primary text-white p-2 rounded-lg"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen bg-surface border-r border-border transition-all duration-300 z-40',
          'md:relative md:border-r',
          isOpen ? 'w-64' : 'w-20',
          !isMobileOpen && '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            {logo && (
              <div className={clsx('transition-opacity', !isOpen && 'md:hidden')}>
                {logo}
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="hidden md:flex items-center justify-center p-1 hover:bg-surface-hover rounded"
              aria-label="Toggle sidebar"
            >
              <ChevronRight
                className={clsx('w-5 h-5 transition-transform', !isOpen && 'rotate-180')}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {items.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    'text-sm font-medium whitespace-nowrap',
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:bg-surface-hover'
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.icon}
                  {isOpen && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-error text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Footer */}
          {footer && <div className="p-4 border-t border-border">{footer}</div>}
        </div>
      </aside>

      {/* Main content spacer for desktop */}
      <div className={clsx('hidden md:block transition-all duration-300', isOpen ? 'w-64' : 'w-20')} />
    </>
  );
};
