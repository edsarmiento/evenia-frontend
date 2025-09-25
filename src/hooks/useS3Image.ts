/**
 * useS3Image Hook
 * Custom hook to handle S3 image loading with fallback
 */

import { useState, useEffect } from 'react';
import { S3Service } from '@/services/s3.service';

interface UseS3ImageOptions {
  fallbackUrl?: string;
  expiresIn?: number;
}

export function useS3Image(originalUrl: string, options: UseS3ImageOptions = {}) {
  const { fallbackUrl = '/placeholder-event.svg', expiresIn = 3600 } = options;
  
  const [imageUrl, setImageUrl] = useState<string>(originalUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      // If it's not an S3 URL, use it directly
      if (!S3Service.isS3Url(originalUrl)) {
        setImageUrl(originalUrl);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const freshUrl = await S3Service.getImageUrlWithFallback(originalUrl, fallbackUrl);
        setImageUrl(freshUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load image');
        setImageUrl(fallbackUrl);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [originalUrl, fallbackUrl, expiresIn]);

  const refreshImage = async () => {
    if (S3Service.isS3Url(originalUrl)) {
      setIsLoading(true);
      setError(null);
      
      try {
        const freshUrl = await S3Service.getImageUrlWithFallback(originalUrl, fallbackUrl);
        setImageUrl(freshUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to refresh image');
        setImageUrl(fallbackUrl);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    imageUrl,
    isLoading,
    error,
    refreshImage,
  };
}
