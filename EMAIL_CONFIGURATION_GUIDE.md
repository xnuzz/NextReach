# 📧 Email System Setup Guide

## Gmail App Password Configuration

Your NextReach website is ready to send professional emails! Follow these steps to enable the email system:

### Step 1: Enable 2-Factor Authentication

1. Go to your Gmail account: **nextreachtech379@gmail.com**
2. Click on your profile picture → **Manage your Google Account**
3. Navigate to **Security** (left sidebar)
4. Scroll to **2-Step Verification** → Click **Get Started**
5. Follow the prompts to set up 2-Step Verification (you'll need your phone)

### Step 2: Generate App Password

1. After enabling 2FA, go back to **Security** settings
2. Scroll down to **2-Step Verification** section
3. At the bottom, find **App passwords** → Click it
4. You may need to sign in again
5. In the "Select app" dropdown, choose **Mail**
6. In the "Select device" dropdown, choose **Other (Custom name)**
7. Type: **NextReach Website**
8. Click **Generate**
9. Google will show you a **16-character password** (format: xxxx xxxx xxxx xxxx)
10. **IMPORTANT**: Copy this password immediately! You won't be able to see it again

### Step 3: Configure Environment Variables

1. Open your project folder: `c:\Users\ralex\OneDrive\Documents\VS code work\NextReach`
2. Create a file named `.env` (if it doesn't exist)
3. Add these lines:

```env
# Email Configuration
EMAIL_USER=nextreachtech379@gmail.com
EMAIL_PASSWORD=your_16_character_app_password_here

# DeepSeek AI (if you have it)
DEEPSEEK_API_KEY=your_deepseek_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

4. Replace `your_16_character_app_password_here` with the password from Step 2
5. **Remove all spaces** from the app password (make it: xxxxxxxxxxxxxxxx)
6. Save the file

### Step 4: Restart Your Server

Open terminal in VS Code and run:

```bash
# Stop current server (Ctrl+C if running)

# Start server
npm start
```

You should see:
```
✅ Email service configured
🚀 NextReach server running securely on port 3000
```

## Testing the Email System

### Test 1: Contact Form on New Contact Page

1. Open your browser: `http://localhost:3000/contact.html`
2. Fill out the contact form with your email
3. Click **Send Message**
4. Check both inboxes:
   - **nextreachtech379@gmail.com** - Should receive admin notification
   - **Your test email** - Should receive auto-response

### Test 2: Check Email Content

**Admin Email Should Include:**
- Customer name, email, phone
- Company name
- Service interest
- Budget range
- Full message
- "Reply within 24 hours" reminder

**Customer Auto-Response Should Include:**
- Personalized greeting
- "What Happens Next" timeline
- Links to portfolio and packages
- Contact information

## Troubleshooting

### Error: "Invalid login credentials"
- **Solution**: Double-check your app password has no spaces
- Make sure you're using the **app password**, not your regular Gmail password
- Verify 2FA is enabled

### Error: "Less secure app access"
- **Solution**: This shouldn't happen with app passwords, but if it does:
  - Use app password instead of regular password
  - App passwords bypass "less secure app" restrictions

### Emails going to spam
- **Solution**: 
  - Add `nextreachtech379@gmail.com` to your contacts
  - Mark first email as "Not Spam"
  - Wait 24-48 hours for Gmail to learn your sending patterns

### Emails not sending at all
- **Solution**:
  1. Check server logs for error messages
  2. Verify `.env` file is in the correct location
  3. Make sure `EMAIL_USER` and `EMAIL_PASSWORD` are correct
  4. Try regenerating a new app password

## Email System Features

### ✅ Currently Working

1. **Contact Form Emails**
   - Admin notification (to business)
   - Customer auto-response (to customer)
   - Includes all form fields (name, email, phone, company, service, budget, message)

2. **Professional Templates**
   - Beautiful HTML email designs
   - Mobile-responsive
   - Branded with NextReach colors

3. **Security**
   - Environment variables (passwords not in code)
   - Input validation
   - Rate limiting on contact endpoint

### 🔮 Future Enhancements (When Payment System is Added)

1. **Payment Confirmation Emails**
   - Receipt with order details
   - Payment plan summary
   - Next steps guide

2. **Welcome Email Series**
   - Onboarding instructions
   - Client portal access
   - Resource links

3. **Admin Notifications**
   - New sale alerts
   - Payment milestones
   - Customer actions

## Environment Variable Reference

```env
# Required for Email System
EMAIL_USER=nextreachtech379@gmail.com      # Your Gmail address
EMAIL_PASSWORD=xxxxxxxxxxxxxxxx             # 16-char app password (no spaces)

# Optional
PORT=3000                                   # Server port (default: 3000)
NODE_ENV=development                        # Environment (development/production)
DEEPSEEK_API_KEY=your_key                  # For AI assistant (optional)
```

## Security Best Practices

1. ✅ **Never commit `.env` file to Git**
   - Add `.env` to `.gitignore`
   - Your `.env` file stays on your local machine

2. ✅ **Use App Passwords**
   - More secure than regular passwords
   - Can be revoked anytime
   - Doesn't expose your main Gmail password

3. ✅ **Rotate Passwords Regularly**
   - Generate new app password every 3-6 months
   - Revoke old app passwords in Google settings

4. ✅ **Monitor Email Activity**
   - Check Gmail's "Recent activity" regularly
   - Review sent emails for any suspicious activity

## Next Steps

After email system is working:

1. ✅ Test contact form thoroughly
2. ✅ Customize email templates (optional)
3. ✅ Set up email forwarding rules (optional)
4. ✅ Create saved responses in Gmail
5. ✅ Connect payment system (future)
6. ✅ Set up email analytics (future)

## Support

If you encounter issues:

1. Check this guide first
2. Review server console logs
3. Check Gmail account activity
4. Verify `.env` file configuration
5. Test with different email addresses

---

**Last Updated**: October 28, 2025  
**Status**: ✅ Ready to configure
