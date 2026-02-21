import React, { useState } from 'react';
import { trackResourceDownload, trackFormSubmission } from '../utils/analytics';

export default function LeadCaptureModal({ isOpen, onClose, resourceName, resourceDescription }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Track lead capture
    trackFormSubmission('resource_signup');
    trackResourceDownload(resourceName);
    
    // Store lead data (in a real app, this would go to a backend)
    const leads = JSON.parse(localStorage.getItem('dsp_leads') || '[]');
    leads.push({
      ...formData,
      resource: resourceName,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('dsp_leads', JSON.stringify(leads));
    
    // Show success message
    setSubmitted(true);
    
    // Reset after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        
        {!submitted ? (
          <>
            <h2>Access: {resourceName}</h2>
            <p className="lead" style={{ marginBottom: '1.5rem' }}>
              {resourceDescription || 'Sign up to receive instant access to this resource.'}
            </p>
            
            <form onSubmit={handleSubmit} className="form">
              <label>Full Name *</label>
              <input
                type="text"
                required
                placeholder="Alex Rivera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              
              <label>Work Email *</label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              
              <label>Company *</label>
              <input
                type="text"
                required
                placeholder="Contoso Ltd."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              
              <small style={{ opacity: 0.8, marginTop: '0.5rem' }}>
                By submitting this form, you agree to receive related communications from DSP. 
                We respect your privacy and will never share your information.
              </small>
              
              <button type="submit" className="btn btn-orange" style={{ marginTop: '1rem' }}>
                Get Access
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h2>Thank you!</h2>
            <p>Check your email for access to {resourceName}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
