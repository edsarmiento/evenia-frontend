/**
 * Environment configuration
 * Centralized configuration for all environment variables
 */

export const env = {
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  
  // AWS Configuration
  AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-2',
  AWS_S3_BUCKET: process.env.NEXT_PUBLIC_AWS_S3_BUCKET || 'evenia-production',
  
  // Environment
  APP_ENV: process.env.NODE_ENV || 'development',
  
  // App Configuration
  APP_NAME: 'EV Frontend',
  APP_VERSION: '1.0.0',
} as const;

// Type for environment variables
export type EnvConfig = typeof env;

// Validation function
export const validateEnv = (): void => {
  const requiredVars = ['API_BASE_URL'] as const;
  
  for (const varName of requiredVars) {
    if (!env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
};

// Helper to check if we're in development
export const isDevelopment = (): boolean => env.APP_ENV === 'development';

// Helper to check if we're in production
export const isProduction = (): boolean => env.APP_ENV === 'production';
