import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav
      className={clsx('flex items-center gap-2 text-sm', className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-muted-light" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-muted-light">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
