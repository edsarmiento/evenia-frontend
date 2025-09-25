/**
 * ImageWithFallback Component
 * Handles image loading with S3 fallback and error handling
 */

'use client';

import { useS3Image } from '@/hooks/useS3Image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder-event.svg',
  onError,
  onLoad,
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const { imageUrl, isLoading, error, refreshImage } = useS3Image(src, {
    fallbackUrl: fallbackSrc,
  });

  const handleError = () => {
    onError?.();
  };

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={error ? 'Image not available' : alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <button
            onClick={refreshImage}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
