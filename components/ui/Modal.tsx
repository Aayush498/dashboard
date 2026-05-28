import React from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeButton = true,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-slideInRight">
        <div
          className={clsx(
            'bg-surface border border-border rounded-2xl shadow-xl w-full',
            'max-h-[90vh] overflow-y-auto',
            sizeClasses[size]
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || closeButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-surface z-10">
              {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-surface-hover rounded transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-muted-light" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
};
