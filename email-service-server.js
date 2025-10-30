// NextReach Email Service - Server-side with Nodemailer
const nodemailer = require('nodemailer');

// Email configuration
const EMAIL_CONFIG = {
    businessEmail: 'nextreachtech379@gmail.com',
    businessName: 'NextReach',
    fromName: 'NextReach Team',
};

// Create email transporter
// You'll need to set up an App Password in Gmail
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'nextreachtech379@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'YOUR_GMAIL_APP_PASSWORD' // Replace with App Password
        }
    });
};

// Email Templates
const emailTemplates = {
    
    // 1. Contact Form Submission (to business)
    contactFormToAdmin: (formData) => ({
        to: EMAIL_CONFIG.businessEmail,
        subject: `🎯 New Contact Form: ${formData.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
                <h2 style="color: #1e3a8a; margin-bottom: 20px;">📨 New Contact Form Submission</h2>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${formData.name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
                    <p style="margin: 10px 0;"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
                    <p style="margin: 10px 0;"><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 8px;">
                    <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
                    <p style="color: #475569; line-height: 1.6; margin: 0;">${formData.message}</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 5px;">
                    <p style="margin: 0; color: #1e3a8a;">⏰ <strong>Action Required:</strong> Reply within 24 hours for best conversion rate!</p>
                </div>
            </div>
        `
    }),
    
    // 2. Auto-response to customer (after contact form)
    contactFormAutoResponse: (formData) => ({
        to: formData.email,
        subject: `Thanks for Reaching Out! - NextReach`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1e3a8a; margin: 0;">NextReach</h1>
                    <p style="color: #64748b; margin: 5px 0;">Digital Marketing Excellence</p>
                </div>
                
                <h2 style="color: #1e3a8a;">Hi ${formData.name}! 👋</h2>
                
                <p style="color: #475569; line-height: 1.6;">
                    Thank you for reaching out to NextReach! We've received your message and are excited to help transform your digital presence.
                </p>
                
                <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 20px; border-radius: 10px; color: white; margin: 25px 0;">
                    <h3 style="margin: 0 0 15px 0;">⚡ What Happens Next?</h3>
                    <p style="margin: 8px 0;">✅ We review your message within 2 hours</p>
                    <p style="margin: 8px 0;">✅ Our team reaches out within 24 hours</p>
                    <p style="margin: 8px 0;">✅ We schedule a free strategy call</p>
                </div>
                
                <p style="color: #475569; line-height: 1.6;">
                    In the meantime, feel free to check out our <a href="https://nextreach.com" style="color: #3b82f6;">portfolio</a> or learn more about our <a href="https://nextreach.com/#packages" style="color: #3b82f6;">service packages</a>.
                </p>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; color: #64748b; font-size: 14px;">
                        <strong>Questions?</strong> Reply to this email or call us at (555) 123-4567
                    </p>
                </div>
                
                <p style="color: #475569;">
                    Best regards,<br>
                    <strong>The NextReach Team</strong>
                </p>
            </div>
        `
    }),
    
    // 3. Payment Success Receipt (to customer)
    paymentReceipt: (orderData) => ({
        to: orderData.customerEmail,
        subject: `Payment Confirmed - Order #${orderData.orderId.substring(0, 10)} ✅`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
                        ✓
                    </div>
                    <h1 style="color: #10b981; margin: 0;">Payment Successful!</h1>
                </div>
                
                <p style="color: #475569; font-size: 16px;">Hi ${orderData.customerName},</p>
                
                <p style="color: #475569; line-height: 1.6;">
                    Thank you for choosing NextReach! Your payment has been processed successfully, and we're excited to start working on your project.
                </p>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 25px 0;">
                    <h3 style="color: #1e3a8a; margin: 0 0 15px 0;">📋 Order Summary</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Order ID:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e3a8a; font-weight: bold; text-align: right;">#${orderData.orderId.substring(0, 16)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Package:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e3a8a; text-align: right;">${orderData.packageName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Payment Plan:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e3a8a; text-align: right;">${orderData.paymentPlan}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Amount Paid Today:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #10b981; font-weight: bold; text-align: right;">$${orderData.amountPaid.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px 0 0 0; color: #1e3a8a; font-weight: bold;">Total Investment:</td>
                            <td style="padding: 15px 0 0 0; color: #1e3a8a; font-weight: bold; font-size: 18px; text-align: right;">$${orderData.totalAmount.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 25px; border-radius: 10px; color: white; margin: 25px 0;">
                    <h3 style="margin: 0 0 15px 0; color: white;">🚀 What Happens Next?</h3>
                    <p style="margin: 10px 0; color: rgba(255,255,255,0.95);">1️⃣ <strong>Welcome Email</strong> - Arriving within 1 hour with next steps</p>
                    <p style="margin: 10px 0; color: rgba(255,255,255,0.95);">2️⃣ <strong>Kickoff Call</strong> - We'll reach out within 24-48 hours to schedule</p>
                    <p style="margin: 10px 0; color: rgba(255,255,255,0.95);">3️⃣ <strong>Onboarding</strong> - Complete a brief questionnaire about your goals</p>
                    <p style="margin: 10px 0; color: rgba(255,255,255,0.95);">4️⃣ <strong>Project Launch</strong> - Work begins in 3-5 business days!</p>
                </div>
                
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0; color: #92400e;">
                        💡 <strong>Pro Tip:</strong> Check your spam folder for our welcome email, and add nextreachtech379@gmail.com to your contacts!
                    </p>
                </div>
                
                <p style="color: #475569; line-height: 1.6;">
                    Need help or have questions? Just reply to this email or call us at (555) 123-4567.
                </p>
                
                <p style="color: #475569;">
                    Excited to work with you!<br>
                    <strong>The NextReach Team</strong>
                </p>
                
                <div style="border-top: 2px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                    <p style="margin: 5px 0;">This is an automated receipt. Please keep it for your records.</p>
                    <p style="margin: 5px 0;">NextReach Digital Marketing | nextreachtech379@gmail.com</p>
                </div>
            </div>
        `
    }),
    
    // 4. Payment Notification (to business)
    paymentNotificationToAdmin: (orderData) => ({
        to: EMAIL_CONFIG.businessEmail,
        subject: `🎉 New Payment: $${orderData.amountPaid} - ${orderData.packageName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">💰 New Sale!</h1>
                </div>
                
                <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1e3a8a; margin: 0 0 20px 0;">Order Details</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr style="background: #f8fafc;">
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Order ID:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${orderData.orderId}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Package:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${orderData.packageName}</td>
                        </tr>
                        <tr style="background: #f8fafc;">
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Payment Plan:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${orderData.paymentPlan}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Amount Paid:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #10b981; font-weight: bold; font-size: 18px;">$${orderData.amountPaid.toFixed(2)}</td>
                        </tr>
                        <tr style="background: #f8fafc;">
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Total Value:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">$${orderData.totalAmount.toFixed(2)}</td>
                        </tr>
                    </table>
                    
                    <h3 style="color: #1e3a8a; margin: 25px 0 15px 0;">Customer Information</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background: #f8fafc;">
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Name:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${orderData.customerName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></td>
                        </tr>
                        <tr style="background: #f8fafc;">
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Phone:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${orderData.customerPhone || 'Not provided'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Date:</strong></td>
                            <td style="padding: 12px; border: 1px solid #e2e8f0;">${new Date().toLocaleString()}</td>
                        </tr>
                    </table>
                    
                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 25px 0;">
                        <p style="margin: 0; color: #92400e;">
                            ⚡ <strong>Action Required:</strong> Send welcome email and schedule kickoff call within 24 hours!
                        </p>
                    </div>
                    
                    <p style="text-align: center; margin-top: 25px;">
                        <a href="https://dashboard.stripe.com/payments/${orderData.orderId}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">View in Stripe Dashboard</a>
                    </p>
                </div>
            </div>
        `
    }),
    
    // 5. Welcome Email (to customer after payment)
    welcomeEmail: (customerData) => ({
        to: customerData.customerEmail,
        subject: `Welcome to NextReach! Let's Get Started 🚀`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1e3a8a; margin: 0; font-size: 32px;">Welcome to NextReach! 🎉</h1>
                    <p style="color: #64748b; margin: 10px 0;">Let's transform your digital presence together</p>
                </div>
                
                <p style="color: #475569; font-size: 16px;">Hi ${customerData.customerName},</p>
                
                <p style="color: #475569; line-height: 1.6;">
                    Welcome to the NextReach family! We're thrilled to have you on board and can't wait to bring your vision to life with our <strong>${customerData.packageName}</strong>.
                </p>
                
                <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 25px; border-radius: 10px; color: white; margin: 30px 0;">
                    <h3 style="margin: 0 0 20px 0; color: white;">📋 Your Next Steps</h3>
                    
                    <div style="margin: 15px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                        <h4 style="margin: 0 0 8px 0; color: white;">1️⃣ Access Your Client Portal</h4>
                        <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px;">Track progress, share files, and communicate with your team</p>
                        <p style="margin: 10px 0 0 0;"><a href="https://portal.nextreach.com" style="color: #60a5fa; font-weight: bold;">→ Open Portal</a></p>
                    </div>
                    
                    <div style="margin: 15px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                        <h4 style="margin: 0 0 8px 0; color: white;">2️⃣ Complete Onboarding Questionnaire</h4>
                        <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px;">Tell us about your brand, goals, and target audience (5 minutes)</p>
                        <p style="margin: 10px 0 0 0;"><a href="https://nextreach.com/onboarding" style="color: #60a5fa; font-weight: bold;">→ Start Questionnaire</a></p>
                    </div>
                    
                    <div style="margin: 15px 0; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                        <h4 style="margin: 0 0 8px 0; color: white;">3️⃣ Schedule Your Kickoff Call</h4>
                        <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px;">We'll email you within 24 hours with available times</p>
                    </div>
                </div>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 25px 0;">
                    <h3 style="color: #1e3a8a; margin: 0 0 15px 0;">📚 Helpful Resources</h3>
                    <p style="margin: 8px 0;"><a href="#" style="color: #3b82f6;">📄 Brand Guidelines Template</a></p>
                    <p style="margin: 8px 0;"><a href="#" style="color: #3b82f6;">📅 Content Calendar Template</a></p>
                    <p style="margin: 8px 0;"><a href="#" style="color: #3b82f6;">📊 Social Media Best Practices Guide</a></p>
                    <p style="margin: 8px 0;"><a href="#" style="color: #3b82f6;">💡 Project Timeline & Milestones</a></p>
                </div>
                
                <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0; color: #065f46;">
                        💡 <strong>Pro Tip:</strong> The more details you provide in the onboarding questionnaire, the better we can tailor your project to match your vision!
                    </p>
                </div>
                
                <div style="border: 2px solid #e2e8f0; padding: 20px; border-radius: 10px; margin: 25px 0;">
                    <h4 style="color: #1e3a8a; margin: 0 0 10px 0;">📞 Need Help?</h4>
                    <p style="margin: 5px 0; color: #475569;">📧 Email: nextreachtech379@gmail.com</p>
                    <p style="margin: 5px 0; color: #475569;">📱 Phone: (555) 123-4567</p>
                    <p style="margin: 5px 0; color: #475569;">💬 Live Chat: Available 9am-6pm EST</p>
                </div>
                
                <p style="color: #475569; line-height: 1.6;">
                    We're excited to embark on this journey with you. If you have any questions, don't hesitate to reach out—we're here to help every step of the way!
                </p>
                
                <p style="color: #475569;">
                    Let's create something amazing together! 🚀<br><br>
                    <strong>The NextReach Team</strong>
                </p>
                
                <div style="border-top: 2px solid #e2e8f0; margin-top: 30px; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                    <p style="margin: 5px 0;">NextReach Digital Marketing</p>
                    <p style="margin: 5px 0;">Transforming businesses through digital excellence</p>
                </div>
            </div>
        `
    })
};

// Email sending functions
const sendEmail = async (emailOptions) => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: `"${EMAIL_CONFIG.fromName}" <${EMAIL_CONFIG.businessEmail}>`,
            ...emailOptions
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Email send error:', error);
        return { success: false, error: error.message };
    }
};

// Export email functions
module.exports = {
    // Contact form - sends to both admin and customer
    async sendContactFormEmails(formData) {
        const results = await Promise.all([
            sendEmail(emailTemplates.contactFormToAdmin(formData)),
            sendEmail(emailTemplates.contactFormAutoResponse(formData))
        ]);
        return results;
    },
    
    // Payment - sends receipt to customer and notification to admin
    async sendPaymentEmails(orderData) {
        const results = await Promise.all([
            sendEmail(emailTemplates.paymentReceipt(orderData)),
            sendEmail(emailTemplates.paymentNotificationToAdmin(orderData))
        ]);
        return results;
    },
    
    // Welcome email after payment
    async sendWelcomeEmail(customerData) {
        return await sendEmail(emailTemplates.welcomeEmail(customerData));
    },
    
    // Direct send function for custom emails
    sendEmail
};
