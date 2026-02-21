/**
 * ⚠️ IMPORTANT: UPDATE THIS FILE BEFORE DEPLOYMENT ⚠️
 * 
 * EMAIL CONFIGURATION FOR FORM SUBMISSIONS
 * =========================================
 * 
 * All forms on the website will send submissions to the email address
 * specified below. Update this to your actual admin/contact email.
 * 
 * Current Status: ❌ NOT CONFIGURED (using placeholder email)
 * 
 * TO SETUP:
 * 1. Replace ADMIN_EMAIL below with your actual email address
 * 2. Save this file
 * 3. Rebuild/redeploy the application
 * 4. Submit a test form
 * 5. Check your email for FormSubmit verification (first time only)
 * 6. Click the verification link
 * 7. Test again to confirm submissions arrive
 * 
 * Example: 
 *   const ADMIN_EMAIL = 'contact@datasolutionsplatform.com';
 * 
 */

// ============================================
// 👇 CHANGE THIS EMAIL ADDRESS 👇
// ============================================

const ADMIN_EMAIL = 'admin@datasolutionsplatform.com';

// ============================================
// 👆 CHANGE THIS EMAIL ADDRESS 👆
// ============================================

/**
 * DO NOT EDIT BELOW THIS LINE UNLESS YOU WANT TO CHANGE THE EMAIL SERVICE
 */

export default {
  adminEmail: ADMIN_EMAIL,
  formSubmitEndpoint: `https://formsubmit.co/ajax/${ADMIN_EMAIL}`,
  
  // Status check
  isConfigured: () => {
    const defaultEmails = [
      'admin@datasolutionsplatform.com',
      'your-email@example.com',
      'youremail@domain.com'
    ];
    return !defaultEmails.includes(ADMIN_EMAIL);
  },
  
  // Display configuration status
  logStatus: () => {
    console.log('='.repeat(50));
    console.log('📧 EMAIL SERVICE CONFIGURATION STATUS');
    console.log('='.repeat(50));
    console.log(`Admin Email: ${ADMIN_EMAIL}`);
    console.log(`Configuration Status: ${config.isConfigured() ? '✅ Configured' : '❌ Not Configured'}`);
    console.log(`FormSubmit Endpoint: ${config.formSubmitEndpoint}`);
    if (!config.isConfigured()) {
      console.warn('⚠️  WARNING: Using placeholder email. Update src/config/emailConfig.js');
    }
    console.log('='.repeat(50));
  }
};

const config = {
  adminEmail: ADMIN_EMAIL,
  formSubmitEndpoint: `https://formsubmit.co/ajax/${ADMIN_EMAIL}`,
  isConfigured: function() {
    const defaultEmails = [
      'admin@datasolutionsplatform.com',
      'your-email@example.com',
      'youremail@domain.com'
    ];
    return !defaultEmails.includes(ADMIN_EMAIL);
  },
  logStatus: function() {
    console.log('='.repeat(50));
    console.log('📧 EMAIL SERVICE CONFIGURATION STATUS');
    console.log('='.repeat(50));
    console.log(`Admin Email: ${ADMIN_EMAIL}`);
    console.log(`Configuration Status: ${this.isConfigured() ? '✅ Configured' : '❌ Not Configured'}`);
    console.log(`FormSubmit Endpoint: ${this.formSubmitEndpoint}`);
    if (!this.isConfigured()) {
      console.warn('⚠️  WARNING: Using placeholder email. Update src/config/emailConfig.js');
    }
    console.log('='.repeat(50));
  }
};

export { config, ADMIN_EMAIL };
