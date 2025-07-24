# Email Setup Guide - Nodemailer with Gmail

This guide will help you set up email delivery using Nodemailer with Gmail SMTP.

## Prerequisites

1. **Gmail Account**: You need a Gmail account to send emails
2. **2-Step Verification**: Must be enabled on your Gmail account
3. **App Password**: Required for secure SMTP authentication

## Step 1: Enable 2-Step Verification

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Follow the setup process if not already enabled

## Step 2: Generate App Password

1. In Google Account Settings, go to **Security**
2. Under **2-Step Verification**, click **App passwords**
3. Select **Mail** as the app type
4. Select **Other (custom name)** as the device
5. Enter "Study Abroad Assistant" as the name
6. Click **Generate**
7. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

## Step 3: Configure Environment Variables

Update your `.env.local` file with your Gmail credentials:

```bash
# Gmail SMTP Configuration for Nodemailer
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

**Important:**

- Replace `your-email@gmail.com` with your actual Gmail address
- Replace `abcd efgh ijkl mnop` with the App Password you generated
- Do NOT use your regular Gmail password - only use the App Password

## Step 4: Test Email Configuration

The application will automatically test the email configuration when it starts. Check the console for:

```
✅ Email configuration is valid
```

If you see an error, verify your credentials and App Password.

## Troubleshooting

### Common Issues

1. **"Invalid login"** - Check that you're using the App Password, not your regular password
2. **"530 Authentication required"** - Ensure 2-Step Verification is enabled
3. **"535 Username and Password not accepted"** - Verify the App Password is correct
4. **"connect ECONNREFUSED :465"** - Connection issue with Gmail SMTP:
   - **Solution**: The app now uses port 587 instead of 465
   - **Check**: Your internet connection and firewall settings
   - **Alternative**: Try using a different network (mobile hotspot) to test

### Network/Firewall Issues

If you get `ECONNREFUSED` errors:

1. **Check your internet connection**
2. **Firewall/Antivirus**: Some firewalls block SMTP connections
   - Temporarily disable firewall to test
   - Add exception for Node.js or your application
3. **Corporate/University Networks**: May block SMTP ports
   - Try using mobile hotspot or different network
   - Contact IT support for SMTP port access
4. **ISP Blocking**: Some ISPs block outgoing SMTP
   - Contact your ISP about port 587 access
   - Consider using a VPN

### Port Configuration

The application now uses these SMTP settings:

- **Host**: smtp.gmail.com
- **Port**: 587 (STARTTLS)
- **Security**: TLS enabled
- **Authentication**: Gmail App Password

### Testing Without Gmail Setup

If you don't want to set up Gmail immediately, the application will still work:

- Emails will be logged to the console instead of being sent
- You'll see detailed email content in the server logs
- All functionality remains intact for development

### Security Notes

- **Never commit your App Password to version control**
- App Passwords are specific to your application
- You can revoke App Passwords anytime from Google Account settings
- Use different App Passwords for different applications

## Email Features

Once configured, your application will send:

1. **University Recommendations** - PDF attachment with university list
2. **SOP Feedback** - Professional feedback with PDF report
3. **Custom Documents** - Any additional documents as requested

## Alternative SMTP Providers

You can also use other SMTP providers by updating the transporter configuration in `lib/email-service.ts`:

### Outlook/Hotmail

```javascript
service: "outlook";
// Use your Outlook credentials
```

### Custom SMTP

```javascript
host: 'smtp.yourprovider.com',
port: 587,
secure: false,
auth: {
  user: 'your-email@yourprovider.com',
  pass: 'your-password'
}
```

## Production Deployment

For production:

1. Use environment variables for credentials
2. Consider using a dedicated email service account
3. Monitor email delivery rates and bounces
4. Implement proper error handling and retry logic

---

**Next Steps:**

1. Set up your Gmail App Password
2. Update `.env.local` with your credentials
3. Restart the development server
4. Test email delivery through the application
