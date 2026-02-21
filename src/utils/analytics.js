// Analytics & Visitor Tracking Utility
// Handles visitor counting, returning visitors, content interaction tracking

const STORAGE_KEY = 'dsp_visitor_data';
const SESSION_KEY = 'dsp_session_id';
const COOKIE_CONSENT_KEY = 'dsp_cookie_consent';

// Generate a unique visitor ID
function generateVisitorId() {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Generate a session ID
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create visitor ID
export function getVisitorId() {
  let visitorId = localStorage.getItem('dsp_visitor_id');
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem('dsp_visitor_id', visitorId);
  }
  return visitorId;
}

// Get or create session ID
export function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

// Cookie Consent Management
export function setCookieConsent(accepted) {
  localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? 'accepted' : 'declined');
}

export function getCookieConsent() {
  return localStorage.getItem(COOKIE_CONSENT_KEY);
}

export function hasCookieConsent() {
  return getCookieConsent() !== null;
}

// Initialize visitor tracking
export function initVisitorTracking() {
  const consent = getCookieConsent();
  if (consent !== 'accepted') return;

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  
  // Get existing data
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  
  // Initialize if first time
  if (!data.firstVisit) {
    data.firstVisit = new Date().toISOString();
    data.totalVisits = 0;
    data.sessions = [];
    data.interactions = [];
  }
  
  // Check if this is a new session (if no existing session or different day)
  const today = new Date().toDateString();
  const lastSession = data.sessions[data.sessions.length - 1];
  const isNewSession = !lastSession || new Date(lastSession.start).toDateString() !== today;
  
  if (isNewSession) {
    data.totalVisits += 1;
    data.sessions.push({
      id: sessionId,
      start: new Date().toISOString(),
      pages: []
    });
  }
  
  data.lastVisit = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  return { visitorId, sessionId, isReturningVisitor: data.totalVisits > 1 };
}

// Track page view
export function trackPageView(page) {
  const consent = getCookieConsent();
  if (consent !== 'accepted') return;

  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (!data.sessions || data.sessions.length === 0) return;
  
  const currentSession = data.sessions[data.sessions.length - 1];
  currentSession.pages.push({
    page,
    timestamp: new Date().toISOString()
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Track content interaction
export function trackInteraction(category, action, label, value = null) {
  const consent = getCookieConsent();
  if (consent !== 'accepted') return;

  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (!data.interactions) data.interactions = [];
  
  data.interactions.push({
    category,
    action,
    label,
    value,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId()
  });
  
  // Keep only last 500 interactions to prevent storage bloat
  if (data.interactions.length > 500) {
    data.interactions = data.interactions.slice(-500);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Get visitor statistics
export function getVisitorStats() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  
  return {
    totalVisits: data.totalVisits || 0,
    firstVisit: data.firstVisit || null,
    lastVisit: data.lastVisit || null,
    sessions: data.sessions || [],
    interactions: data.interactions || [],
    isReturningVisitor: (data.totalVisits || 0) > 1
  };
}

// Get most engaged sections
export function getMostEngagedSections() {
  const stats = getVisitorStats();
  const sectionCounts = {};
  
  stats.interactions.forEach(interaction => {
    if (interaction.category === 'section_view' || interaction.category === 'page_view') {
      sectionCounts[interaction.label] = (sectionCounts[interaction.label] || 0) + 1;
    }
  });
  
  return Object.entries(sectionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

// Track service interest
export function trackServiceInterest(service) {
  trackInteraction('service_interest', 'view', service);
}

// Track training interest
export function trackTrainingInterest(program) {
  trackInteraction('training_interest', 'view', program);
}

// Track video engagement
export function trackVideoPlay(videoTitle) {
  trackInteraction('video', 'play', videoTitle);
}

// Track resource download intent
export function trackResourceDownload(resourceName) {
  trackInteraction('resource', 'download_intent', resourceName);
}

// Track form submission
export function trackFormSubmission(formType) {
  trackInteraction('form', 'submit', formType);
}

// Track CTA clicks
export function trackCTAClick(ctaLabel) {
  trackInteraction('cta', 'click', ctaLabel);
}

// Export all visitor data (for admin/review purposes)
export function exportVisitorData() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dsp_visitor_data_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Clear visitor data (for privacy compliance)
export function clearVisitorData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('dsp_visitor_id');
  sessionStorage.removeItem(SESSION_KEY);
}
