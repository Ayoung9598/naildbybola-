# Email Setup Guide for Local Development

This guide will help you set up email sending in your local development environment.

## Quick Setup Steps

### 1. Gmail Setup (Recommended for Testing)

#### Option A: Using Gmail App Password (Recommended)

1. **Enable 2-Step Verification** on your Gmail account
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification" if not already enabled

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Naildby Bola Website" as the name
   - Click "Generate"
   - Copy the 16-character password (no spaces)

3. **Update `.env` file** in the `backend/` directory:
   ```env
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-16-char-app-password
   DEFAULT_FROM_EMAIL=your-email@gmail.com
   ```

#### Option B: Using Other Email Providers

**Outlook/Office 365:**
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@outlook.com
EMAIL_HOST_PASSWORD=your-password
DEFAULT_FROM_EMAIL=your-email@outlook.com
```

**Yahoo Mail:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@yahoo.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@yahoo.com
```

**Custom SMTP Server:**
```env
EMAIL_HOST=smtp.your-domain.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-username
EMAIL_HOST_PASSWORD=your-password
DEFAULT_FROM_EMAIL=noreply@your-domain.com
```

### 2. Update Your `.env` File

1. Open `backend/.env` file
2. Replace the placeholder values with your actual email credentials:
   - `EMAIL_HOST_USER`: Your email address
   - `EMAIL_HOST_PASSWORD`: Your app password (for Gmail) or regular password
   - `DEFAULT_FROM_EMAIL`: Should match `EMAIL_HOST_USER`

### 3. Test Email Sending

After updating `.env`, restart your Django development server:
```bash
python manage.py runserver
```

Then test by:
- Submitting a booking request
- Submitting a contact form
- Subscribing to newsletter

Check your email inbox (and spam folder) for the emails!

## Troubleshooting

### Issue: "SMTP Authentication failed"

**Solution:**
- Make sure you're using an App Password (not your regular Gmail password)
- Verify 2-Step Verification is enabled
- Check that `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` are correct

### Issue: "Connection refused"

**Solution:**
- Check your internet connection
- Verify `EMAIL_HOST` and `EMAIL_PORT` are correct
- Some networks block SMTP ports - try a different network or VPN

### Issue: Emails going to spam

**Solution:**
- This is normal for development emails
- In production, set up SPF, DKIM, and DMARC records for your domain
- Use a professional email service like SendGrid or Mailgun

### Issue: Still seeing console output instead of emails

**Solution:**
- Make sure your `.env` file is in the `backend/` directory (same level as `manage.py`)
- Restart your Django server after updating `.env`
- Check that `EMAIL_HOST_USER` is not empty in your `.env` file

## Database Configuration

### Running Locally (No Docker)

If you're running PostgreSQL directly on your machine:
```env
DB_NAME=naillash_db
DB_USER=postgres
DB_PASSWORD=your-local-postgres-password
DB_HOST=localhost
DB_PORT=5432
```

### Running with Docker

If you're using `docker-compose`:
```env
DB_NAME=naillash_db
DB_USER=admin
DB_PASSWORD=password
DB_HOST=db
DB_PORT=5432
```

**Note:** You may not need to change database credentials if your current setup is working. Only update if you're switching between Docker and local development.

## Security Notes

⚠️ **Important:**
- Never commit your `.env` file to Git (it should be in `.gitignore`)
- Use different credentials for development and production
- For production, use environment variables in your hosting platform
- App passwords are more secure than using your main email password

