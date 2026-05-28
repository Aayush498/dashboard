'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { ToastNotification } from '@/types';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps extends ToastNotification {
  onClose: () => void;
}

const iconMap = {
  success: <CheckCircle2 className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

const bgColorMap = {
  success: 'bg-success',
  error: 'bg-error',
  warning: 'bg-warning',
  info: 'bg-accent',
};

const textColorMap = {
  success: 'text-white',
  error: 'text-white',
  warning: 'text-black',
  info: 'text-white',
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        'flex items-start gap-3 min-w-80 p-4 rounded-lg shadow-lg animate-slideInRight',
        bgColorMap[type],
        textColorMap[type]
      )}
      role="alert"
    >
      {iconMap[type]}
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        {message && <p className="text-sm opacity-90">{message}</p>}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  notifications: ToastNotification[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ notifications, onRemove }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Toast key={notification.id} {...notification} onClose={() => onRemove(notification.id)} />
      ))}
    </div>
  );
};
