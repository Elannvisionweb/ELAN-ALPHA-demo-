# Gmail SMTP Setup Guide

To send emails from `elan.nvision.web@sa.iith.ac.in`, you need to generate a Gmail App Password.

## Steps to Generate Gmail App Password:

### 1. Enable 2-Factor Authentication (if not already enabled)
1. Go to https://myaccount.google.com/security
2. Under "Signing in to Google", click on **2-Step Verification**
3. Follow the steps to enable it

### 2. Generate App Password
1. Go to https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords (at the bottom)
2. Sign in if prompted
3. Under "Select app", choose **Mail**
4. Under "Select device", choose **Other (Custom name)**
5. Enter a name like "Elan Backend Server"
6. Click **Generate**
7. Google will display a 16-character password (e.g., `abcd efgh ijkl mnop`)

### 3. Update Your .env File
Copy the generated password (without spaces) and update your `.env`:

```env
SMTP_EMAIL=elan.nvision.web@sa.iith.ac.in
SMTP_PASSWORD=abcdefghijklmnop
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

## Important Notes:

- **Never commit** the `.env` file with the actual password to Git
- The app password is different from your regular Gmail password
- If you change your Gmail password, app passwords remain valid
- You can revoke app passwords anytime from the same settings page

## Testing the Email Service

After setting up, restart your backend server and submit a test form. Check:
1. The terminal logs for any email errors
2. The recipient's email inbox (check spam folder too)
3. Gmail's "Sent" folder to confirm the email was sent

## Troubleshooting

If emails aren't sending:
- Verify 2FA is enabled on the Gmail account
- Double-check the app password (no spaces)
- Ensure `SMTP_HOST=smtp.gmail.com` and `SMTP_PORT=587`
- Check if your network/firewall allows outbound connections on port 587
- Look at the server logs for specific error messages

## Alternative: SendGrid or AWS SES

For production, consider using:
- **SendGrid** - Free tier: 100 emails/day
- **AWS SES** - Very cheap, highly reliable
- **Mailgun** - Good for transactional emails

These services have better deliverability and don't require managing Gmail credentials.
