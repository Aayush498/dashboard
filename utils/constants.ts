// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-a0r6.onrender.com';
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// File Upload Configuration
export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
export const ALLOWED_FILE_TYPES = ['.csv', '.xlsx'];
export const ACCEPTED_MIME_TYPES = 'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Cache Duration
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
export const SHORT_CACHE_DURATION = 1 * 60 * 1000; // 1 minute

// Toast Notifications
export const TOAST_DURATION = 5000; // 5 seconds
export const TOAST_DURATION_ERROR = 7000; // 7 seconds
export const TOAST_DURATION_SUCCESS = 4000; // 4 seconds

// Chart Configuration
export const CHART_COLORS = [
  '#3b82f6', // primary
  '#8b5cf6', // secondary
  '#06b6d4', // accent
  '#10b981', // success
  '#f59e0b', // warning
  '#ef4444', // error
];

export const CHART_DEFAULT_HEIGHT = 400;

// Date Formats
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATE_TIME_FORMAT = 'MMM dd, yyyy HH:mm';
export const ISO_DATE_FORMAT = 'yyyy-MM-dd';

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'user-preferences',
  RECENT_ANALYSES: 'recent-analyses',
  FAVORITES: 'favorites',
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_DARK_MODE: true,
  ENABLE_EXPORT: true,
  ENABLE_SHARING: true,
  ENABLE_COMPARISON: true,
  ENABLE_ADVANCED_FILTERS: true,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File is too large. Maximum size is 100 MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a CSV or XLSX file.',
  UPLOAD_FAILED: 'Failed to upload file. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  FILE_UPLOADED: 'File uploaded successfully.',
  ANALYSIS_COMPLETE: 'Analysis completed successfully.',
  EXPORTED: 'File exported successfully.',
  SHARED: 'Analysis shared successfully.',
} as const;
