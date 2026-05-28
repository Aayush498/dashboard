export interface AnalysisData {
  total_rows: number;
  total_columns: number;
  access_distribution: Record<string, number>;
  ai_analysis: string;
  timestamp?: string;
  fileName?: string;
  fileSize?: number;
}

export interface FileHistory {
  id: string;
  fileName: string;
  uploadDate: Date;
  fileSize: number;
  analysisData?: AnalysisData;
  status: 'pending' | 'completed' | 'failed';
  error?: string;
}

export interface DashboardMetrics {
  totalUploads: number;
  totalRows: number;
  averageColumns: number;
  lastAnalyzed: Date | null;
}

export interface FilterOptions {
  searchTerm: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: string[];
}

export interface ExportFormat {
  format: 'pdf' | 'csv' | 'xlsx' | 'png';
  fileName: string;
  includeCharts?: boolean;
  includeAnalysis?: boolean;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  subItems?: NavigationItem[];
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'heatmap';
  dataKey: string;
  label: string;
  color?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  sidebarCollapsed: boolean;
  defaultChartType: ChartConfig['type'];
  autoExportOnAnalysis: boolean;
  notificationsEnabled: boolean;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
