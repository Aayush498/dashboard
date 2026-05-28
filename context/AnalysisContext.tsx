'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalysisData, FileHistory, DashboardMetrics, ToastNotification } from '@/types';
import { apiService } from '@/services/apiService';

interface AnalysisContextType {
  currentData: AnalysisData | null;
  fileHistory: FileHistory[];
  isLoading: boolean;
  error: string | null;
  notifications: ToastNotification[];
  metrics: DashboardMetrics;
  uploadFile: (file: File) => Promise<void>;
  removeFile: (id: string) => void;
  clearHistory: () => void;
  addNotification: (notification: Omit<ToastNotification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setError: (error: string | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [currentData, setCurrentData] = useState<AnalysisData | null>(null);
  const [fileHistory, setFileHistory] = useState<FileHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.uploadAndAnalyze(file);

      if (response.success && response.data) {
        setCurrentData(response.data);

        const newHistory: FileHistory = {
          id: `${Date.now()}-${Math.random()}`,
          fileName: file.name,
          uploadDate: new Date(),
          fileSize: file.size,
          analysisData: response.data,
          status: 'completed',
        };

        setFileHistory((prev) => [newHistory, ...prev]);

        addNotification({
          type: 'success',
          title: 'Analysis Complete',
          message: `Successfully analyzed ${file.name}`,
          duration: 5000,
        });
      } else {
        setError(response.error || 'Failed to analyze file');
        addNotification({
          type: 'error',
          title: 'Analysis Failed',
          message: response.error || 'Failed to analyze file',
          duration: 5000,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (id: string) => {
    setFileHistory((prev) => prev.filter((f) => f.id !== id));
  };

  const clearHistory = () => {
    setFileHistory([]);
    setCurrentData(null);
  };

  const addNotification = (notification: Omit<ToastNotification, 'id'>) => {
    const id = `${Date.now()}-${Math.random()}`;
    const fullNotification: ToastNotification = { ...notification, id };
    setNotifications((prev) => [...prev, fullNotification]);

    if (notification.duration) {
      setTimeout(() => removeNotification(id), notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const metrics: DashboardMetrics = {
    totalUploads: fileHistory.length,
    totalRows: fileHistory.reduce((sum, file) => sum + (file.analysisData?.total_rows || 0), 0),
    averageColumns: fileHistory.length
      ? fileHistory.reduce((sum, file) => sum + (file.analysisData?.total_columns || 0), 0) / fileHistory.length
      : 0,
    lastAnalyzed: fileHistory[0]?.uploadDate || null,
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentData,
        fileHistory,
        isLoading,
        error,
        notifications,
        metrics,
        uploadFile,
        removeFile,
        clearHistory,
        addNotification,
        removeNotification,
        setError,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within AnalysisProvider');
  }
  return context;
}
