/**
 * S3 Service Test Utility
 * Simple test to verify S3 service functionality
 */

import { S3Service } from '@/services/s3.service';

export async function testS3Service() {
  console.log('Testing S3 Service...');
  
  // Test URL from your API response
  const testUrl = 'https://evenia-production.s3.us-east-2.amazonaws.com/uploads/event/images/1025/2025-09-25-02-33-03.png?X-Amz-Expires=600&X-Amz-Date=20250925T174710Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZ7SALG7OZ3VKMAZ5%2F20250925%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=815d066d58025e8e1ff98f2fb5c199cf1ff0caf69549ff0aee2d1d80bf2d6624';
  
  try {
    // Test URL detection
    const isS3 = S3Service.isS3Url(testUrl);
    console.log('Is S3 URL:', isS3);
    
    // Test key extraction
    const key = S3Service.extractS3Key(testUrl);
    console.log('Extracted S3 key:', key);
    
    // Test fresh URL generation (this will only work if AWS credentials are configured)
    if (key) {
      const freshUrl = await S3Service.getImageUrlWithFallback(testUrl);
      console.log('Fresh URL generated:', freshUrl);
    }
    
    console.log('S3 Service test completed successfully!');
  } catch (error) {
    console.error('S3 Service test failed:', error);
  }
}
