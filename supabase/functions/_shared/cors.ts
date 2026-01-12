// Shared CORS configuration for all edge functions
// Restricts API access to known application domains

const ALLOWED_ORIGINS = [
  // Production domains
  'https://bargn.fi',
  'https://www.bargn.fi',
  // Lovable preview domains
  /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/,
  /^https:\/\/[a-z0-9-]+\.lovable\.app$/,
  // Local development
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  
  // Check if origin matches any allowed origin
  const isAllowed = ALLOWED_ORIGINS.some((allowed) => {
    if (typeof allowed === 'string') {
      return origin === allowed;
    }
    // RegExp pattern matching for dynamic subdomains
    return allowed.test(origin);
  });

  // For internal cron jobs or service-to-service calls (no origin header)
  if (!origin) {
    return {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS[0] as string,
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    };
  }

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : (ALLOWED_ORIGINS[0] as string),
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Vary': 'Origin',
  };
}

export function handleCorsPreflightRequest(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders(req) });
  }
  return null;
}
