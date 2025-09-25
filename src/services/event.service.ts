/**
 * Event Service
 * Handles all event-related API calls
 */

import { apiClient } from '@/lib/api-client';
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api';

// Event types - matching your Rails API response
export interface Event {
  id: number;
  name: string;
  description: string;
  cover_image_url?: string;
  images?: string[];
  category: {
    name: string;
  };
  sub_category: {
    name: string;
  };
  event_place: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  owner: {
    id: number;
    name: string;
    email: string;
  };
  promoted: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  event_days: Array<{
    id: number;
    date: string;
    start_time: string;
    end_time?: string;
  }>;
  products: Array<{
    id: number;
    name: string;
    description: string;
    base_price: number;
    currency: string;
    image_url?: string;
    product_type: string;
  }>;
  reviews_count: number;
  average_rating?: number;
}

export interface EventSearchParams extends PaginationParams {
  query?: string;
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

export class EventService {
  private static readonly BASE_PATH = 'v1/events';

  /**
   * Get all events with pagination and filters
   */
  static async getEvents(params?: PaginationParams): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<{ events: Event[]; pagination: any }>(this.BASE_PATH, params);
    
    // The API client returns the response directly, not wrapped in a data property
    return {
      data: response.events,
      pagination: response.pagination,
      success: true,
      timestamp: new Date().toISOString(),
    } as PaginatedResponse<Event>;
  }

  /**
   * Get event by ID
   */
  static async getEventById(id: string): Promise<Event> {
    const response = await apiClient.get<{ event: Event }>(`${this.BASE_PATH}/${id}`);
    return response.event;
  }

  /**
   * Search events with filters
   */
  static async searchEvents(params: EventSearchParams): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<{ events: Event[]; pagination: any }>(
      `${this.BASE_PATH}/search`,
      params
    );
    
    // Transform the response to match our expected format
    return {
      data: response.events,
      pagination: response.pagination,
      success: true,
      timestamp: new Date().toISOString(),
    } as PaginatedResponse<Event>;
  }

  /**
   * Get featured events
   */
  static async getFeaturedEvents(limit: number = 6): Promise<Event[]> {
    const response = await apiClient.get<Event[]>(
      `${this.BASE_PATH}/featured`,
      { limit }
    );
    return response;
  }

  /**
   * Get upcoming events
   */
  static async getUpcomingEvents(params?: PaginationParams): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<{ events: Event[]; pagination: any }>(
      `${this.BASE_PATH}/upcoming`,
      params
    );
    
    // Transform the response to match our expected format
    return {
      data: response.events,
      pagination: response.pagination,
      success: true,
      timestamp: new Date().toISOString(),
    } as PaginatedResponse<Event>;
  }

  /**
   * Get events by category
   */
  static async getEventsByCategory(
    category: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<{ events: Event[]; pagination: any }>(
      `${this.BASE_PATH}/category/${category}`,
      params
    );
    
    // Transform the response to match our expected format
    return {
      data: response.events,
      pagination: response.pagination,
      success: true,
      timestamp: new Date().toISOString(),
    } as PaginatedResponse<Event>;
  }

  /**
   * Get events near location
   */
  static async getEventsNearLocation(
    latitude: number,
    longitude: number,
    radius: number = 10,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<{ events: Event[]; pagination: any }>(
      `${this.BASE_PATH}/nearby`,
      {
        latitude,
        longitude,
        radius,
        ...params,
      }
    );
    
    // Transform the response to match our expected format
    return {
      data: response.events,
      pagination: response.pagination,
      success: true,
      timestamp: new Date().toISOString(),
    } as PaginatedResponse<Event>;
  }
}
