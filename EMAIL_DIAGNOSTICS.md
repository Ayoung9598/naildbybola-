# Email Not Sending - Diagnostics

## Quick Check: Render Environment Variables

1. **Go to Render Dashboard** → `naildbybola-backend` → **Environment** tab
2. **Verify these are set:**
   - `EMAIL_HOST` = `smtp.gmail.com` (or your email provider)
   - `EMAIL_PORT` = `587`
   - `EMAIL_USE_TLS` = `True`
   - `EMAIL_HOST_USER` = Your email address
   - `EMAIL_HOST_PASSWORD` = Your Gmail App Password (16 characters)
   - `DEFAULT_FROM_EMAIL` = Your email address

## Check Runtime Logs (NOT Build Logs)

1. **Go to Render Dashboard** → `naildbybola-backend` → **Logs** tab
2. **Submit a test:**
   - Fill contact form on frontend
   - Or submit booking
   - Or subscribe to newsletter
3. **Look for these log messages:**
   - `INFO Attempting to send contact notification email to...`
   - `INFO Contact notification email sent successfully. Result: 1`
   - OR `ERROR Failed to send contact notification: ...`

## Common Issues

### Issue 1: Email Backend Using Console
**Symptom:** Logs show "⚠️ Email credentials not set. Emails will be printed to console."

**Fix:** Set all email environment variables in Render Dashboard

### Issue 2: Gmail App Password Wrong
**Symptom:** Logs show authentication errors

**Fix:** 
- Generate new Gmail App Password: https://myaccount.google.com/apppasswords
- Update `EMAIL_HOST_PASSWORD` in Render

### Issue 3: Background Thread Not Running
**Symptom:** No email logs at all after form submission

**Fix:** Check if threads are starting (should see "Attempting to send..." logs)

### Issue 4: Email Settings Not Loading
**Symptom:** Logs might show connection errors

**Fix:** Verify all environment variables are spelled correctly (case-sensitive)

## What Changed?

- Emails now send in **background threads** (to prevent timeouts)
- This requires Django to be initialized in each thread (`django.setup()`)
- If threads aren't working, emails won't send

## Test Email Configuration

After checking logs, share what you see:
1. Any `INFO Attempting to send...` messages?
2. Any `ERROR Failed to send...` messages?
3. Any `⚠️ Email credentials not set...` messages?

This will help identify the exact issue.

