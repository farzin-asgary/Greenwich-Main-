const fs = require('fs');
let code = fs.readFileSync('src/shared/api/client.ts', 'utf8');

const prefix = `
const isLive = import.meta.env.VITE_API_MODE === 'live';
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

async function fetchLive(endpoint: string, options: RequestInit = {}) {
  const url = \`\${API_BASE}\${endpoint}\`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  
  // Note: credentials: 'include' is important for SameSite=Lax HttpOnly session cookies
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });
  
  if (response.status === 410) {
    const errorData = await response.json().catch(() => ({}));
    throw { status: 410, data: errorData };
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
    throw new Error(errorData.message || 'Error occurred');
  }
  
  return response.json();
}
`;

code = code.replace(/const delay = [^\n]+\n/g, 'const delay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));\n' + prefix);

// Example replacement for getQREntry:
// async getQREntry(qrToken: string): Promise<{ data: QREntryContext }> {
//    if (isLive) return fetchLive(`/qr/${qrToken}`);

const methodsToReplace = {
  getQREntry: "if (isLive) return fetchLive(`/qr/${qrToken}`);",
  requestOTP: "if (isLive) return fetchLive(`/auth/otp/request`, { method: 'POST', body: JSON.stringify({ phone, qrToken }) });",
  verifyOTP: "if (isLive) return fetchLive(`/auth/otp/verify`, { method: 'POST', body: JSON.stringify({ phone, code, qrToken }) });",
  updateConsent: "if (isLive) return fetchLive(`/consent`, { method: 'POST', body: JSON.stringify(consents) });",
  getGuestSession: "if (isLive) return fetchLive(`/session`);",
  endGuestSession: "if (isLive) return fetchLive(`/session`, { method: 'DELETE' });",
  getOffers: "if (isLive) return fetchLive(`/offers`);",
  claimOffer: "if (isLive) return fetchLive(`/offers/${offerId}/claim`, { method: 'POST' });",
  redeemCoupon: "if (isLive) return fetchLive(`/coupons/redeem`, { method: 'POST', body: JSON.stringify({ code, staffPin }) });",
  submitFeedback: "if (isLive) return fetchLive(`/feedback`, { method: 'POST', body: JSON.stringify({ rating, comment, tags }) });",
  recordEvent: "if (isLive) return fetchLive(`/events`, { method: 'POST', body: JSON.stringify({ eventName, objectType, objectId, metadata }) });"
};

for (const [method, liveCode] of Object.entries(methodsToReplace)) {
  const regex = new RegExp(`(async ${method}\\([^)]*\\)[^{]*\\{\\n)`);
  code = code.replace(regex, `$1    ${liveCode}\n`);
}

fs.writeFileSync('src/shared/api/client.ts', code);
