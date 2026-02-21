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

const ADMIN_EMAIL = 'cmdtechs@gmail.com'; // Still used for notification
const WEB3FORMS_ACCESS_KEY = '2c98e418-8754-4040-b511-c075d0e7656a'; // Replace with your Web3Forms access key

// ============================================
// 👆 CHANGE THIS EMAIL ADDRESS 👆
// ============================================

/**
 * DO NOT EDIT BELOW THIS LINE UNLESS YOU WANT TO CHANGE THE EMAIL SERVICE
 */

export default {
  adminEmail: ADMIN_EMAIL,
  web3formsAccessKey: WEB3FORMS_ACCESS_KEY,
  formSubmitEndpoint: 'https://web3forms.com/api',
  // Status check
  isConfigured: () => {
    return WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY';
  },
  // Display configuration status
  logStatus: () => {
    console.log('='.repeat(50));
    console.log('📧 EMAIL SERVICE CONFIGURATION STATUS');
    console.log('='.repeat(50));
    console.log(`Admin Email: ${ADMIN_EMAIL}`);
    console.log(`Web3Forms Access Key: ${WEB3FORMS_ACCESS_KEY}`);
    console.log(`Configuration Status: ${WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY' ? '✅ Configured' : '❌ Not Configured'}`);
    console.log(`Web3Forms Endpoint: https://web3forms.com/api`);
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      console.warn('⚠️  WARNING: Web3Forms access key not set. Update src/config/emailConfig.js');
    }
    console.log('='.repeat(50));
  }
};

const config = {
  adminEmail: ADMIN_EMAIL,
  web3formsAccessKey: WEB3FORMS_ACCESS_KEY,
  formSubmitEndpoint: 'https://web3forms.com/api',
  isConfigured: function() {
    return WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY';
  },
  logStatus: function() {
    console.log('='.repeat(50));
    console.log('📧 EMAIL SERVICE CONFIGURATION STATUS');
    console.log('='.repeat(50));
    console.log(`Admin Email: ${ADMIN_EMAIL}`);
    console.log(`Web3Forms Access Key: ${WEB3FORMS_ACCESS_KEY}`);
    console.log(`Configuration Status: ${WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY' ? '✅ Configured' : '❌ Not Configured'}`);
    console.log(`Web3Forms Endpoint: https://web3forms.com/api`);
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      console.warn('⚠️  WARNING: Web3Forms access key not set. Update src/config/emailConfig.js');
    }
    console.log('='.repeat(50));
  }
};

export { config, ADMIN_EMAIL };
