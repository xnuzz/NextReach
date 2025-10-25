# NextReach Payment System Setup Guide

## 🎉 Payment Integration Complete!

Your Stripe payment processing system is now ready. Follow these steps to activate it:

---

## 📋 What Was Added

### New Files Created:
1. **payment.html** - Professional checkout page with package and payment plan selection
2. **payment.js** - Stripe payment processing logic with form validation
3. **payment-success.html** - Beautiful success page with order details

### Modified Files:
1. **server.js** - Added `/create-payment-intent` endpoint and Stripe webhook handler
2. **package.json** - Added Stripe dependency
3. **.env** - Added Stripe API key configuration

---

## 🔑 Step 1: Get Your Stripe API Keys

### Create a Stripe Account (Free):
1. Go to https://stripe.com
2. Click "Sign up" and create your account
3. Complete business verification (takes 1-2 days for live payments)

### Get Your Test Keys (For Development):
1. Go to https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) - Used in frontend
   - **Secret key** (starts with `sk_test_...`) - Used in backend

### Copy Your Keys:
```
Publishable key: pk_test_51ABC123...
Secret key: sk_test_51ABC123...
```

---

## ⚙️ Step 2: Configure Your Environment

### Update .env file:
Open `.env` and replace the placeholder keys:

```env
# Replace these with your actual Stripe keys
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE
```

### Update payment.js:
Open `payment.js` (line 6) and replace the publishable key:

```javascript
// Replace this line with your actual key
const stripe = Stripe('pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE');
```

---

## 🚀 Step 3: Install Stripe Package

Run this command in your terminal:

```bash
npm install stripe
```

---

## 🧪 Step 4: Test the Payment System

### Start Your Server:
```bash
npm start
```

### Test Payment Flow:
1. Open http://localhost:3000/payment.html
2. Fill in test information:
   - **Name:** Test Customer
   - **Email:** test@example.com
   - **Phone:** (555) 123-4567

3. Use Stripe test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - **CVC:** Any 3 digits (e.g., 123)
   - **Expiry:** Any future date (e.g., 12/25)
   - **ZIP:** Any 5 digits (e.g., 12345)

4. Click "Complete Secure Payment"
5. You should see the success page with order details

### Verify in Stripe Dashboard:
1. Go to https://dashboard.stripe.com/test/payments
2. You should see your test payment listed

---

## 🔗 Step 5: Link Payment Page to Main Site

You need to add "Get Started" buttons to your main page that link to the payment page.

### Option A: Link All Packages to Payment Page
Add this to your main page pricing buttons:

```html
<!-- Starter Package -->
<a href="payment.html?package=starter" class="cta-button">Get Started</a>

<!-- Professional Package -->
<a href="payment.html?package=professional" class="cta-button">Get Started</a>

<!-- Premium Package -->
<a href="payment.html?package=premium" class="cta-button">Get Started</a>
```

### Option B: Open in New Tab
```html
<a href="payment.html?package=professional" target="_blank" class="cta-button">Get Started</a>
```

---

## 📧 Step 6: Set Up Stripe Email Receipts (Automatic)

Stripe automatically sends email receipts when `receipt_email` is provided (already configured).

To customize your receipt emails:
1. Go to https://dashboard.stripe.com/settings/emails
2. Click "Customer emails"
3. Enable "Successful payments"
4. Customize your email template (add logo, colors, etc.)

---

## 🔔 Step 7: Set Up Webhooks (Optional but Recommended)

Webhooks notify your server when payments succeed/fail.

### Create Webhook in Stripe:
1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Enter webhook URL: `https://yourdomain.com/webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_...`)

### Update .env:
```env
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

---

## 💼 Step 8: Go Live (When Ready)

### Switch to Live Mode:
1. Complete Stripe account verification
2. Go to https://dashboard.stripe.com/apikeys (remove `/test` from URL)
3. Get your **live** keys:
   - Live publishable key: `pk_live_...`
   - Live secret key: `sk_live_...`

### Update Production Keys:
```env
# Production .env
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
NODE_ENV=production
```

### Update payment.js:
```javascript
const stripe = Stripe('pk_live_YOUR_LIVE_PUBLISHABLE_KEY');
```

⚠️ **NEVER commit live keys to Git!** Always use environment variables.

---

## 🎯 Payment Features Included

✅ **3 Package Options:**
- Starter: $697
- Professional: $1,497 (Most Popular)
- Premium: $2,000

✅ **3 Payment Plans:**
- 6 Monthly Payments (0% interest)
- 3 Monthly Payments (0% interest)
- Pay in Full (10% discount)

✅ **Security Features:**
- Stripe's PCI-compliant checkout
- SSL encryption (when deployed with HTTPS)
- Rate limiting on payment endpoints
- Input validation and sanitization

✅ **Customer Experience:**
- Beautiful checkout UI matching your brand
- Real-time card validation
- Clear error messages
- Order summary sidebar
- Professional success page
- Automatic email receipts

✅ **Business Features:**
- Customer records in Stripe dashboard
- Automatic receipt generation
- Payment tracking and reporting
- Refund management through Stripe
- Subscription support (for future installments)

---

## 📊 How to Track Payments

### View Payments:
- Test: https://dashboard.stripe.com/test/payments
- Live: https://dashboard.stripe.com/payments

### View Customers:
- Test: https://dashboard.stripe.com/test/customers
- Live: https://dashboard.stripe.com/customers

### Download Reports:
1. Go to https://dashboard.stripe.com/reports
2. Create custom reports for:
   - Revenue by package
   - Payment plan distribution
   - Failed payment analysis
   - Customer lifetime value

---

## 🐛 Troubleshooting

### "Payment processing unavailable" Error:
- Check that `STRIPE_SECRET_KEY` is set in `.env`
- Verify the secret key starts with `sk_test_` (test mode) or `sk_live_` (live mode)
- Restart your server after updating `.env`

### Card Declined in Test Mode:
- Make sure you're using test card numbers (4242 4242 4242 4242)
- Use any future expiry date (e.g., 12/25)
- Use any 3-digit CVC (e.g., 123)

### Payment Succeeds but No Success Page:
- Check browser console for JavaScript errors
- Verify `payment-success.html` exists
- Check that localStorage is enabled

### Webhook Not Receiving Events:
- Use ngrok or similar service to test locally: `ngrok http 3000`
- Update webhook URL in Stripe dashboard to ngrok URL
- Check that `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard

---

## 🔐 Security Best Practices

1. **Never Expose Secret Keys:**
   - Keep `.env` out of Git (already in `.gitignore`)
   - Use environment variables in production
   - Rotate keys if compromised

2. **Use HTTPS in Production:**
   - Required for live payments
   - Get free SSL with Let's Encrypt or Cloudflare

3. **Validate All Inputs:**
   - Already implemented in `server.js`
   - Never trust client-side data

4. **Monitor for Fraud:**
   - Enable Stripe Radar (automatic fraud detection)
   - Set up alerts for suspicious activity
   - Review declined payments regularly

---

## 💡 Next Steps

1. ✅ Set up Stripe account
2. ✅ Get API keys
3. ✅ Update .env and payment.js
4. ✅ Install Stripe package: `npm install stripe`
5. ✅ Test with test card: 4242 4242 4242 4242
6. 🔄 Add payment buttons to main page
7. 🔄 Customize email receipts in Stripe
8. 🔄 Set up webhooks for payment notifications
9. 🔄 Complete business verification for live mode
10. 🔄 Switch to live keys when ready to accept real payments

---

## 📞 Support

### Stripe Documentation:
- Testing: https://stripe.com/docs/testing
- Payments: https://stripe.com/docs/payments
- API Reference: https://stripe.com/docs/api

### Common Questions:
- **How long until I can accept live payments?** 1-2 days for verification
- **Are there transaction fees?** Yes, 2.9% + 30¢ per transaction
- **Can I refund payments?** Yes, through Stripe dashboard
- **What currencies are supported?** USD, EUR, GBP, and 135+ more

---

## 🎊 You're Ready to Accept Payments!

Your NextReach site can now process payments securely. Test thoroughly in test mode before going live.

**Remember:** Always test with Stripe's test cards before using real cards!

---

## 📝 Quick Reference

### Test Cards:
- ✅ Success: `4242 4242 4242 4242`
- ❌ Decline: `4000 0000 0000 0002`
- 🔐 3D Secure: `4000 0027 6000 3184`

### Dashboard Links:
- Test Payments: https://dashboard.stripe.com/test/payments
- Live Payments: https://dashboard.stripe.com/payments
- API Keys: https://dashboard.stripe.com/apikeys
- Webhooks: https://dashboard.stripe.com/webhooks

### Support:
- Stripe Support: https://support.stripe.com
- NextReach Site Issues: Check browser console for errors
