import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2 text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light">{icon}</div>}
          <input
            ref={ref}
            className={clsx(
              'w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground',
              'placeholder-muted-light transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              icon && 'pl-10',
              error && 'border-error focus:ring-error',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-error text-sm mt-1">{error}</p>}
        {helperText && !error && <p className="text-muted-light text-sm mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
