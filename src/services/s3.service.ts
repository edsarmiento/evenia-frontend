/**
 * S3 Service
 * Handles AWS S3 bucket operations for image retrieval
 */

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/config/env';

// S3 Configuration
const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = env.AWS_S3_BUCKET;

export class S3Service {
  /**
   * Extract the S3 key from a full S3 URL
   */
  static extractS3Key(url: string): string | null {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('s3') && urlObj.pathname) {
        // Remove leading slash and return the key
        return urlObj.pathname.substring(1);
      }
      return null;
    } catch (error) {
      console.error('Error extracting S3 key:', error);
      return null;
    }
  }

  /**
   * Generate a new pre-signed URL for an S3 object
   */
  static async generatePresignedUrl(s3Key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: s3Key,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn });
      return presignedUrl;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw new Error('Failed to generate presigned URL');
    }
  }

  /**
   * Get a fresh pre-signed URL for an image
   */
  static async getImageUrl(originalUrl: string): Promise<string> {
    try {
      const s3Key = this.extractS3Key(originalUrl);
      if (!s3Key) {
        throw new Error('Invalid S3 URL');
      }

      return await this.generatePresignedUrl(s3Key);
    } catch (error) {
      console.error('Error getting image URL:', error);
      throw error;
    }
  }

  /**
   * Check if a URL is an S3 URL
   */
  static isS3Url(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('s3') || urlObj.hostname.includes('amazonaws.com');
    } catch {
      return false;
    }
  }

  /**
   * Get image URL with fallback handling
   */
  static async getImageUrlWithFallback(originalUrl: string, fallbackUrl?: string): Promise<string> {
    try {
      if (!this.isS3Url(originalUrl)) {
        return originalUrl;
      }

      return await this.getImageUrl(originalUrl);
    } catch (error) {
      console.warn('Failed to get S3 image URL, using fallback:', error);
      return fallbackUrl || '/placeholder-event.svg';
    }
  }
}
