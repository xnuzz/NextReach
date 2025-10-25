# EmailJS Setup Guide for NextReach

## 📧 Free Email Automation System

EmailJS allows you to send emails directly from JavaScript without a backend. **Free tier: 200 emails/month**

---

## 🚀 Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com
2. Click "Sign Up" (free account)
3. Verify your email address
4. Log in to https://dashboard.emailjs.com

---

## 🔧 Step 2: Add Email Service

### Connect Your Email Provider:

1. Click "Email Services" in the left sidebar
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **SendGrid** (for production)
   - **Custom SMTP**

### For Gmail Setup:
1. Select "Gmail"
2. Click "Connect Account"
3. Sign in with your Gmail account
4. Allow EmailJS permissions
5. Copy the **Service ID** (e.g., `service_abc123`)

### For Custom SMTP (Professional):
1. Select "Custom SMTP"
2. Enter your SMTP server details:
   ```
   SMTP Server: smtp.your-domain.com
   Port: 587
   Username: noreply@nextreach.com
   Password: your-smtp-password
   ```
3. Test the connection
4. Copy the **Service ID**

---

## 📝 Step 3: Create Email Templates

### Template 1: Contact Form Notification
1. Click "Email Templates" → "Create New Template"
2. Name: "Contact Form Submission"
3. Template content:

```html
Subject: New Contact Form Submission from {{from_name}}

Hello NextReach Team,

You have received a new contact form submission:

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

Reply to: {{reply_to}}

---
This is an automated message from NextReach contact form.
```

4. Save and copy the **Template ID** (e.g., `template_xyz789`)

---

### Template 2: Booking Confirmation
1. Create New Template
2. Name: "Booking Confirmation"
3. Template content:

```html
Subject: Your Strategy Call is Confirmed! 🎉

Hi {{customer_name}},

Great news! Your strategy call with NextReach is confirmed.

📅 Booking Details:
- Date: {{booking_date}}
- Time: {{booking_time}}
- Service: {{service}}
- Confirmation #: {{confirmation_number}}

🔗 Add to Calendar: {{calendar_link}}

What to Prepare:
✓ Your business goals and challenges
✓ Current marketing materials (if any)
✓ Questions about our services

Need to reschedule? Reply to this email or call us at (555) 123-4567.

Looking forward to speaking with you!

The NextReach Team
support@nextreach.com
```

4. Save and copy **Template ID**

---

### Template 3: Payment Success
1. Create New Template
2. Name: "Payment Confirmation"
3. Template content:

```html
Subject: Payment Received - Order #{{order_id}} ✓

Hi {{customer_name}},

Thank you for your payment! Your order has been confirmed.

💳 Payment Summary:
Order ID: {{order_id}}
Package: {{package_name}}
Amount Paid: {{amount_paid}}
Total Investment: {{total_amount}}
Payment Plan: {{payment_plan}}
Date: {{order_date}}

✨ What's Next?

1. Check your email for a welcome message (arriving within 1 hour)
2. We'll reach out within 24-48 hours to schedule your kickoff call
3. Complete the onboarding questionnaire we'll send
4. Your project begins in 3-5 business days!

Need Help?
📧 Email: support@nextreach.com
📞 Phone: (555) 123-4567
💬 Live Chat: nextreach.com

This receipt was automatically generated. Please keep it for your records.

---
NextReach Digital Marketing
Transforming businesses through digital excellence
```

4. Save and copy **Template ID**

---

### Template 4: Welcome Email
1. Create New Template
2. Name: "Welcome to NextReach"
3. Template content:

```html
Subject: Welcome to NextReach! Let's Get Started 🚀

Hi {{customer_name}},

Welcome to the NextReach family! We're excited to transform your digital presence.

🎯 Your Package: {{package_name}}

📋 Important Next Steps:

1. **Access Your Client Portal**
   {{portal_link}}
   Check project progress, files, and communication in real-time.

2. **Complete Onboarding Questionnaire**
   {{onboarding_link}}
   Tell us about your brand, audience, and goals (takes 5 minutes).

3. **Schedule Your Kickoff Call**
   We'll email you within 24 hours with available times.

4. **Join Our Slack Channel**
   Direct line to your project team for quick questions.

📚 Resources:
- Brand Guidelines Template
- Content Calendar Template
- Social Media Best Practices Guide

💡 Pro Tip: The more information you provide in the onboarding questionnaire, the better we can tailor your project to your vision!

Questions? Reply to this email or contact {{support_email}}

Excited to work with you!

The NextReach Team
---
This is a one-time welcome email.
```

4. Save and copy **Template ID**

---

## 🔑 Step 4: Get Your Public Key

1. Click "Account" in sidebar
2. Find "API Keys" section
3. Copy your **Public Key** (e.g., `YOUR_PUBLIC_KEY_123abc`)

---

## ⚙️ Step 5: Configure NextReach

### Update email-service.js:
Open `email-service.js` and replace these values (lines 8-15):

```javascript
this.serviceId = 'service_abc123'; // Your Service ID from Step 2
this.publicKey = 'YOUR_PUBLIC_KEY_123abc'; // Your Public Key from Step 4

this.templates = {
    contactForm: 'template_xyz789', // Template 1 ID
    bookingConfirmation: 'template_def456', // Template 2 ID
    paymentSuccess: 'template_ghi789', // Template 3 ID
    welcomeEmail: 'template_jkl012' // Template 4 ID
};
```

### Update email-config.html:
Open `email-config.html` and replace (line 9):

```javascript
emailjs.init("YOUR_PUBLIC_KEY_123abc"); // Your Public Key
```

---

## 🧪 Step 6: Test Email Sending

### Test from Browser Console:

1. Open http://localhost:3000/payment-success.html (with test order data)
2. Open browser console (F12)
3. Run this test:

```javascript
// Test payment confirmation email
emailService.sendPaymentConfirmation({
    customerName: 'Test User',
    customerEmail: 'your-email@gmail.com', // Use your real email
    orderId: 'pi_test_123',
    packageName: 'Professional Package',
    amountPaid: 748,
    totalAmount: 1497,
    paymentPlan: '6month',
    customerPhone: '(555) 123-4567'
}).then(result => {
    console.log('Email test result:', result);
});
```

4. Check your email inbox - you should receive the payment confirmation!

### Test Contact Form:
```javascript
emailService.sendContactForm({
    name: 'Test Customer',
    email: 'your-email@gmail.com',
    phone: '(555) 123-4567',
    message: 'This is a test message from the contact form.'
}).then(result => {
    console.log('Contact form test:', result);
});
```

---

## 📨 Step 7: Add Email to Contact Form

Update your contact form in `index.html`:

```javascript
// Find your contact form submit handler and add:
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Send email
    const result = await emailService.sendContactForm(formData);
    
    if (result.success) {
        alert('Thank you! We\'ll be in touch soon.');
        this.reset();
        
        // Send auto-response
        await emailService.sendAutoResponse(formData.email, formData.name);
    } else {
        alert('Sorry, something went wrong. Please try again or email us directly.');
    }
});
```

---

## 📊 Step 8: Monitor Email Sending

### View Email History:
1. Go to https://dashboard.emailjs.com/admin
2. Click "Email History"
3. See all sent emails, delivery status, and opens

### Check Quota:
- Free Plan: 200 emails/month
- Monitor usage in dashboard
- Upgrade to paid plan if needed (starts at $7/month for 1,000 emails)

---

## 🎨 Step 9: Customize Email Design

### Add Your Logo:
1. Upload logo to your server
2. Add to email template:
```html
<img src="https://nextreach.com/NextReach.svg" alt="NextReach" style="width: 150px; margin-bottom: 20px;">
```

### Add Styling:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
    <div style="background: white; padding: 30px; border-radius: 12px;">
        <!-- Your content here -->
    </div>
</div>
```

### Add Footer:
```html
<div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
    <p>NextReach Digital Marketing<br>
    123 Business St, City, State 12345<br>
    (555) 123-4567 | support@nextreach.com</p>
    
    <p>
        <a href="{{unsubscribe_link}}" style="color: #3b82f6;">Unsubscribe</a> |
        <a href="https://nextreach.com/privacy" style="color: #3b82f6;">Privacy Policy</a>
    </p>
</div>
```

---

## 🚨 Troubleshooting

### "EmailJS is not defined" Error:
- Check that CDN script is loaded: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>`
- Verify script loads before `email-service.js`

### Emails Not Sending:
- Check service ID and template IDs are correct
- Verify public key in email-service.js
- Check browser console for errors
- Check EmailJS dashboard for failed sends

### Gmail Blocks Sending:
- Enable "Less secure app access" in Gmail settings
- Or use App Password instead of account password
- Or switch to SendGrid for production

### Hitting Rate Limits:
- Free plan: 200 emails/month
- Add delays between emails: `await sleep(1000)`
- Upgrade to paid plan if needed

---

## 💰 Pricing & Upgrades

### Free Plan:
- ✅ 200 emails/month
- ✅ 2 email services
- ✅ 2 templates
- ✅ Basic support

### Personal Plan ($7/month):
- ✅ 1,000 emails/month
- ✅ Unlimited services & templates
- ✅ Remove EmailJS branding
- ✅ Email support

### Production Plan ($20/month):
- ✅ 10,000 emails/month
- ✅ API access
- ✅ Webhooks
- ✅ Priority support

---

## 🔐 Security Best Practices

1. **Never expose private keys**
   - Only use public key in frontend
   - Keep private key secure (if using API)

2. **Validate inputs**
   - Already implemented in email-service.js
   - Prevents spam and injection attacks

3. **Rate limiting**
   - EmailJS has built-in rate limits
   - Add client-side cooldowns for forms

4. **Sender reputation**
   - Use verified domain email (not Gmail) for production
   - Authenticate with SPF/DKIM records

---

## 📧 Email Templates Summary

After setup, you'll have these templates configured:

| Template | Purpose | Trigger |
|----------|---------|---------|
| Contact Form | Notify business of inquiry | User submits contact form |
| Booking Confirmation | Confirm call booking | User books strategy call |
| Payment Success | Receipt for payment | Payment completed |
| Welcome Email | Onboarding instructions | After successful payment |
| Auto-Response | Acknowledge contact | Contact form submission |
| Business Alert | New order notification | Payment completed |

---

## ✅ Checklist

- [ ] Create EmailJS account
- [ ] Add email service (Gmail/SMTP)
- [ ] Create 4 email templates
- [ ] Copy Service ID, Public Key, Template IDs
- [ ] Update email-service.js with IDs
- [ ] Update email-config.html with public key
- [ ] Test email sending in browser console
- [ ] Verify emails arrive in inbox
- [ ] Add email to contact form
- [ ] Add email to booking form
- [ ] Customize email templates with branding
- [ ] Monitor email history in dashboard

---

## 🎯 Next Steps

1. ✅ Complete EmailJS setup
2. Test all email templates
3. Customize templates with your branding
4. Add unsubscribe links (required by law)
5. Set up SPF/DKIM for custom domain
6. Monitor email deliverability
7. Consider upgrading if you exceed 200 emails/month

---

## 📞 Support

### EmailJS Documentation:
- Getting Started: https://www.emailjs.com/docs/
- Templates: https://www.emailjs.com/docs/user-guide/creating-email-template/
- API Reference: https://www.emailjs.com/docs/sdk/

### Common Issues:
- **Emails go to spam:** Add SPF/DKIM records for your domain
- **Template not found:** Double-check template ID matches dashboard
- **Service error:** Verify service is connected and active

---

## 🎊 You're Ready for Email Automation!

Your NextReach site can now send:
- ✅ Contact form notifications
- ✅ Booking confirmations
- ✅ Payment receipts
- ✅ Welcome emails
- ✅ Auto-responders

**Remember:** Test thoroughly with your own email before going live!
