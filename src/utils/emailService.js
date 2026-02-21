// Email Service Configuration
// Uses FormSubmit.co - a free service that forwards form submissions to email

import { config } from '../config/emailConfig.js';

const EMAIL_CONFIG = {
  adminEmail: config.adminEmail,
  formSubmitEndpoint: config.formSubmitEndpoint,
};

// Log configuration status on load (dev mode)
if (import.meta.env.DEV) {
  config.logStatus();
}

/**
 * Send form submission to admin email
 * @param {Object} formData - The form data to send
 * @param {string} formType - Type of form (contact, request, login_inquiry)
 * @returns {Promise<Object>} Response from email service
 */
export async function sendFormSubmission(formData, formType) {
  try {
    const submissionData = {
      ...formData,
      _subject: getEmailSubject(formType),
      _template: 'table',
      _captcha: 'false',
      formType: formType,
      submittedAt: new Date().toISOString(),
      _cc: '', // Add CC email if needed
    };

    const response = await fetch(EMAIL_CONFIG.formSubmitEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submissionData)
    });

    if (!response.ok) {
      throw new Error(`Email service responded with status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Email submission error:', error);
    
    // Fallback: Try to open default email client
    const mailtoLink = createMailtoLink(formData, formType);
    console.log('Fallback mailto link:', mailtoLink);
    
    return { 
      success: false, 
      error: error.message,
      fallbackMailto: mailtoLink
    };
  }
}

/**
 * Get email subject based on form type
 */
function getEmailSubject(formType) {
  const subjects = {
    'contact': 'New Contact Form Submission - DSP Website',
    'request': 'New Service Request - DSP Website',
    'login_inquiry': 'Portal Access Request - DSP Website'
  };
  return subjects[formType] || 'New Form Submission - DSP Website';
}

/**
 * Create a mailto link as fallback
 */
function createMailtoLink(formData, formType) {
  const subject = encodeURIComponent(getEmailSubject(formType));
  const body = encodeURIComponent(formatEmailBody(formData, formType));
  return `mailto:${EMAIL_CONFIG.adminEmail}?subject=${subject}&body=${body}`;
}

/**
 * Format form data into readable email body
 */
function formatEmailBody(formData, formType) {
  let body = `Form Type: ${formType}\n`;
  body += `Submission Date: ${new Date().toLocaleString()}\n`;
  body += '\n--- Form Data ---\n\n';
  
  Object.entries(formData).forEach(([key, value]) => {
    if (!key.startsWith('_')) {
      body += `${key}: ${value}\n`;
    }
  });
  
  return body;
}

/**
 * Send Service Request form
 */
export async function sendServiceRequest(formData) {
  const requestData = {
    name: formData.name,
    company: formData.company,
    email: formData.email,
    phone: formData.phone || 'Not provided',
    services: formData.services,
    message: formData.message || 'No message provided'
  };
  
  return sendFormSubmission(requestData, 'request');
}

/**
 * Send Contact form
 */
export async function sendContactForm(formData) {
  const contactData = {
    name: formData.name,
    email: formData.email,
    message: formData.message
  };
  
  return sendFormSubmission(contactData, 'contact');
}

/**
 * Send Login/Portal Access Inquiry
 */
export async function sendLoginInquiry(formData) {
  const inquiryData = {
    email: formData.email,
    requestType: 'Portal Access Request',
    note: 'User attempted to login. May need account setup or credentials.'
  };
  
  return sendFormSubmission(inquiryData, 'login_inquiry');
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Configuration instructions for setup
 */
export const SETUP_INSTRUCTIONS = `
EMAIL SERVICE SETUP INSTRUCTIONS:
==================================

**QUICKEST WAY TO CONFIGURE:**

1. Open src/config/emailConfig.js
2. Find the ADMIN_EMAIL constant (around line 30)
3. Replace 'admin@datasolutionsplatform.com' with your actual admin email
4. Save the file and restart dev server

Example:
  const ADMIN_EMAIL = 'contact@yourcompany.com';

**FIRST TIME SETUP:**
- FormSubmit will send a verification email on first use
- Click the verification link to activate
- All subsequent submissions will be forwarded automatically

**ALTERNATIVE SERVICES:** 
EmailJS, Web3Forms, Formspree, or custom backend
(See EMAIL_SETUP_GUIDE.md for details)
`;

export default {
  sendServiceRequest,
  sendContactForm,
  sendLoginInquiry,
  isValidEmail,
  EMAIL_CONFIG
};
