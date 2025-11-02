// Non-secret configuration (magic numbers, app constants)
export const APP_CONFIG = {
  // File upload limits
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp'],
  
  // UI behavior
  debounceMs: 300,
  toastDuration: 3000,
  
  // Scan history
  maxHistoryItems: 50,
} as const;
