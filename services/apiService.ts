import axios, { AxiosInstance, AxiosError } from 'axios';
import { AnalysisData, APIResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-a0r6.onrender.com';

class APIService {
  private client: AxiosInstance;
  private requestCache: Map<string, { data: any; timestamp: number }>;
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.requestCache = new Map();
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API] Response received:`, response.status);
        return response;
      },
      (error: AxiosError) => {
        console.error('[API] Error:', error.message);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): APIResponse<null> {
    if (error.response) {
      return {
        success: false,
        error: `Server error: ${error.response.status} ${error.response.statusText}`,
        timestamp: new Date().toISOString(),
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'No response from server. Please check your internet connection.',
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      };
    }
  }

  private getCacheKey(method: string, url: string, data?: any): string {
    return `${method}:${url}:${JSON.stringify(data || {})}`;
  }

  private getFromCache(key: string): any | null {
    const cached = this.requestCache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      console.log('[API] Returning cached data');
      return cached.data;
    }
    this.requestCache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.requestCache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  async uploadAndAnalyze(file: File): Promise<APIResponse<AnalysisData>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post<AnalysisData>('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const analysisData: AnalysisData = {
        ...response.data,
        timestamp: new Date().toISOString(),
        fileName: file.name,
        fileSize: file.size,
      };

      return {
        success: true,
        data: analysisData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload file',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async retryRequest<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
        }
      }
    }

    throw lastError || new Error('Request failed after retries');
  }

  clearCache(): void {
    this.requestCache.clear();
    console.log('[API] Cache cleared');
  }

  getCacheStats(): { size: number; entries: number } {
    return {
      size: this.requestCache.size,
      entries: this.requestCache.size,
    };
  }
}

export const apiService = new APIService();
