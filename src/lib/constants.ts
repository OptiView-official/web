// Points Constants
export const POINTS = {
  FIRST_CONNECT: 30,        // Reward for first connection
  REFERRAL_REFERRER: 50,    // Reward for referrer
  REFERRAL_INVITEE: 20,     // Reward for invitee
  CHECK_IN: 10,             // Daily check-in reward
  AI_INTERACTION: 10,       // AI interaction reward
} as const;

// Points Change Reasons
export enum PointsReason {
  FIRST_CONNECT = 'FIRST_CONNECT',
  CHECK_IN = 'CHECK_IN',
  AI_INTERACTION = 'AI_INTERACTION',
  REFERRAL_REFERRER = 'REFERRAL_REFERRER',
  REFERRAL_INVITEE = 'REFERRAL_INVITEE',
}

// Rate Limits
export const RATE_LIMITS = {
  FIRST_CONNECT: { limit: 5, window: 60 },      // 5 times in 1 minute
  BIND_REFERRAL: { limit: 10, window: 60 },     // 10 times in 1 minute
  CHECK_IN: { limit: 2, window: 60 },           // 2 times in 1 minute
  AI_INTERACTION: { limit: 10, window: 60 },    // 10 times in 1 minute
} as const;

// AI Interaction Limits
export const AI_LIMITS = {
  MAX_DAILY_INTERACTIONS: 3,  // Max 3 times per day with points
  MAX_DAILY_REQUESTS: 20,      // Max 20 requests per day (Hard limit)
} as const;

// Signature Expiry
export const SIGNATURE_EXPIRY = {
  HOURS: 24,
  MILLISECONDS: 24 * 60 * 60 * 1000,
} as const;

// Time Constants
export const TIME = {
  MILLISECONDS_PER_DAY: 86400000,
  SECONDS_PER_DAY: 86400,
} as const;

// Security Event Types
export enum SecurityEventType {
  FIRST_CONNECT_ATTEMPT = 'FIRST_CONNECT_ATTEMPT',
  BIND_REFERRAL_ATTEMPT = 'BIND_REFERRAL_ATTEMPT',
  CHECK_IN_ATTEMPT = 'CHECK_IN_ATTEMPT',
  AI_INTERACTION_ATTEMPT = 'AI_INTERACTION_ATTEMPT',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

// Error Codes
export enum ErrorCode {
  // Authentication Errors
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  SIGNATURE_EXPIRED = 'SIGNATURE_EXPIRED',
  INVALID_ADDRESS = 'INVALID_ADDRESS',

  // User Errors
  ALREADY_CONNECTED = 'ALREADY_CONNECTED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // Referral Errors
  REFERRER_NOT_REGISTERED = 'REFERRER_NOT_REGISTERED',
  REFERRER_NOT_CONNECTED = 'REFERRER_NOT_CONNECTED',
  ALREADY_BOUND = 'ALREADY_BOUND',
  SELF_REFERRAL = 'SELF_REFERRAL',
  CIRCULAR_REFERRAL = 'CIRCULAR_REFERRAL',

  // Check-in Errors
  ALREADY_CHECKED_IN = 'ALREADY_CHECKED_IN',

  // AI Interaction Errors
  DAILY_LIMIT_REACHED = 'DAILY_LIMIT_REACHED',

  // System Errors
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

// Error Messages
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.INVALID_SIGNATURE]: 'Invalid wallet signature',
  [ErrorCode.SIGNATURE_EXPIRED]: 'Signature has expired',
  [ErrorCode.INVALID_ADDRESS]: 'Invalid wallet address',
  [ErrorCode.ALREADY_CONNECTED]: 'Wallet already connected',
  [ErrorCode.USER_NOT_FOUND]: 'User not found',
  [ErrorCode.REFERRER_NOT_REGISTERED]: 'Referrer is not registered',
  [ErrorCode.REFERRER_NOT_CONNECTED]: 'Referrer must connect first',
  [ErrorCode.ALREADY_BOUND]: 'Already bound to a referrer',
  [ErrorCode.SELF_REFERRAL]: 'Cannot refer yourself',
  [ErrorCode.CIRCULAR_REFERRAL]: 'Circular referral detected',
  [ErrorCode.ALREADY_CHECKED_IN]: 'Already checked in today',
  [ErrorCode.DAILY_LIMIT_REACHED]: 'Daily limit reached',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Too many requests. Please try again later',
  [ErrorCode.DATABASE_ERROR]: 'Database error occurred',
  [ErrorCode.INTERNAL_ERROR]: 'Internal server error',
};

