/**
 * API Client
 * Centralized HTTP client with error handling, interceptors, and retry logic
 */

import { env, isDevelopment } from '@/config/env';
import type {
  ApiResponse,
  ApiError,
  RequestConfig,
  ApiClientConfig,
  HttpMethod,
} from '@/types/api';

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;
  private retries: number;
  private retryDelay: number;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 10000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.retries = config.retries || 3;
    this.retryDelay = config.retryDelay || 1000;
  }

  /**
   * Make HTTP request with retry logic and error handling
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, config.params);
    const requestConfig = this.buildRequestConfig(config);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, requestConfig);
        
        if (!response.ok) {
          const errorData = await this.parseErrorResponse(response);
          throw new ApiClientError(errorData.message, response.status, errorData);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on client errors (4xx) or if it's the last attempt
        if (error instanceof ApiClientError && error.status < 500) {
          throw error;
        }
        
        if (attempt === this.retries) {
          throw error;
        }

        // Wait before retrying
        await this.delay(this.retryDelay * Math.pow(2, attempt));
      }
    }

    throw lastError || new Error('Request failed');
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    const finalUrl = url.toString();
    console.log('🔧 Building URL:', { endpoint, baseURL: this.baseURL, finalUrl });
    return finalUrl;
  }

  /**
   * Build fetch request configuration
   */
  private buildRequestConfig(config: RequestConfig): RequestInit {
    const headers = { ...this.defaultHeaders, ...config.headers };
    
    const requestConfig: RequestInit = {
      method: config.method,
      headers,
    };

    if (config.body && config.method !== 'GET') {
      requestConfig.body = JSON.stringify(config.body);
    }

    return requestConfig;
  }

  /**
   * Fetch with timeout
   */
  private async fetchWithTimeout(
    url: string,
    config: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Parse error response
   */
  private async parseErrorResponse(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();
      return errorData;
    } catch {
      return {
        message: `HTTP ${response.status}: ${response.statusText}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Delay utility for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authorization token
   */
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

/**
 * Custom error class for API errors
 */
export class ApiClientError extends Error {
  public status: number;
  public data?: ApiError;

  constructor(message: string, status: number, data?: ApiError) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Create API client instance
 */
export const apiClient = new ApiClient({
  baseURL: `${env.API_BASE_URL}/${env.API_VERSION}`,
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'X-Client-Version': env.APP_VERSION,
    'X-Client-Name': env.APP_NAME,
  },
});

// Force cache bust - this will help debug the URL issue
console.log('🔧 API Client initialized with baseURL:', `${env.API_BASE_URL}/${env.API_VERSION}`);


// Log API calls in development
if (isDevelopment()) {
  const originalRequest = apiClient['request'].bind(apiClient);
  apiClient['request'] = async function<T>(endpoint: string, config: RequestConfig) {
    console.log(`🚀 API ${config.method} ${endpoint}`, config.body);
    const result = await originalRequest<T>(endpoint, config);
    console.log(`✅ API ${config.method} ${endpoint}`, result);
    return result;
  };
}
