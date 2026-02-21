import React, { useState, useEffect } from 'react';
import { hasCookieConsent, setCookieConsent, initVisitorTracking } from '../utils/analytics';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    if (!hasCookieConsent()) {
      // Show banner after a short delay
      setTimeout(() => setShow(true), 1000);
    } else {
      // Initialize tracking if consent was previously given
      initVisitorTracking();
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    initVisitorTracking();
    setShow(false);
  };

  const handleDecline = () => {
    setCookieConsent(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-text">
          <h3>Privacy & Cookies</h3>
          <p>
            We use first-party cookies to understand how you engage with our content, 
            measure site traffic, and improve your experience. This helps us provide 
            better services and relevant information. No data is shared with third parties.
          </p>
        </div>
        <div className="cookie-actions">
          <button className="btn btn-orange" onClick={handleAccept}>
            Accept
          </button>
          <button className="btn btn-outline" onClick={handleDecline}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
