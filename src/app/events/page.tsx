/**
 * Events Page
 * Demonstrates how to consume the event API endpoints
 */

'use client';

import { useState, useEffect } from 'react';
import { EventService, type Event, type EventSearchParams } from '@/services/event.service';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<EventSearchParams>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadEvents();
  }, [searchParams]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (searchParams.query || searchParams.category) {
        // Use search endpoint
        response = await EventService.searchEvents(searchParams);
      } else {
        // Use regular events endpoint
        response = await EventService.getEvents(searchParams);
      }
      
      setEvents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchParams({
      ...searchParams,
      query: searchQuery || undefined,
    });
  };

  const handleCategoryFilter = (category: string) => {
    setSearchParams({
      ...searchParams,
      category: category === 'all' ? undefined : category,
    });
  };

  const handleEventClick = async (eventId: number) => {
    try {
      // Get detailed event information
      const event = await EventService.getEventById(eventId.toString());
      console.log('Event details:', event);
      // You can navigate to event detail page or show modal
    } catch (err) {
      console.error('Failed to load event details:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={loadEvents} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Events</h1>
        
        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} variant="primary">
                Search
              </Button>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleCategoryFilter('all')}
                variant={!searchParams.category ? 'primary' : 'outline'}
                size="sm"
              >
                All
              </Button>
              <Button
                onClick={() => handleCategoryFilter('Technology')}
                variant={searchParams.category === 'Technology' ? 'primary' : 'outline'}
                size="sm"
              >
                Technology
              </Button>
              <Button
                onClick={() => handleCategoryFilter('Business')}
                variant={searchParams.category === 'Business' ? 'primary' : 'outline'}
                size="sm"
              >
                Business
              </Button>
              <Button
                onClick={() => handleCategoryFilter('Education')}
                variant={searchParams.category === 'Education' ? 'primary' : 'outline'}
                size="sm"
              >
                Education
              </Button>
              <Button
                onClick={() => handleCategoryFilter('Networking')}
                variant={searchParams.category === 'Networking' ? 'primary' : 'outline'}
                size="sm"
              >
                Networking
              </Button>
            </div>
          </div>
        </Card>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-600">No events found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6" onClick={() => handleEventClick(event.id)}>
                  {event.cover_image_url && (
                    <div className="mb-4">
                      <ImageWithFallback
                        src={event.cover_image_url}
                        alt={event.name}
                        className="w-full h-48 object-cover rounded-md"
                        fallbackSrc="/placeholder-event.svg"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    {event.event_days.length > 0 && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(event.event_days[0].date).toLocaleDateString()}
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {event.event_place.name}
                    </div>
                    
                    {event.products.length > 0 && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {event.products[0].currency} {event.products[0].base_price}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {event.category.name}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      {event.promoted && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Promoted
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {event.reviews_count} reviews
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
