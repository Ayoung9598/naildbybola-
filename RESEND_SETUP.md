# Resend Email Setup (Works with Render Free Tier)

## Why Resend?

✅ **Works on Render free tier** (uses HTTP API, not blocked SMTP)  
✅ **Free tier:** 3,000 emails/month  
✅ **No SMTP needed** (uses HTTP API)  
✅ **Easy setup** and reliable  

## Step 1: Create Resend Account

1. **Go to:** https://resend.com
2. **Sign up** for a free account
3. **Verify your email**

## Step 2: Get Your API Key

1. **Go to Dashboard:** https://resend.com/api-keys
2. **Create API Key:**
   - Click **"Create API Key"**
   - Give it a name (e.g., "NaildbyBola Production")
   - Copy the API key (starts with `re_...`)

⚠️ **Keep your API key safe!** Don't commit it to Git.

## Step 3: Add Domain (Optional but Recommended)

1. **Go to:** https://resend.com/domains
2. **Add Domain:**
   - Enter your domain (if you have one)
   - Or use Resend's default domain for testing

**For free tier:** You can use `onboarding@resend.dev` as sender, but you need to verify a domain for custom email addresses.

## Step 4: Add to Render Environment Variables

1. **Go to Render Dashboard:**
   - https://dashboard.render.com
   - Click on `naildbybola-backend` service

2. **Go to Environment Tab:**
   - Click **"Environment"** tab

3. **Add These Variables:**
   
   - **Key**: `RESEND_API_KEY`
     **Value**: `re_xxxxxxxxxxxxx` (your Resend API key)
   
   - **Key**: `DEFAULT_FROM_EMAIL`
     **Value**: `onboarding@resend.dev` (for testing) OR your verified domain email

4. **Remove/Update Old SMTP Variables (Optional):**
   - You can keep `EMAIL_HOST_USER` if you want (for fallback)
   - Or remove SMTP-related variables since we're using Resend now

5. **Save Changes:**
   - Render will automatically redeploy

## Step 5: Verify It Works

1. **Check Render Logs:**
   - Go to backend service → **"Logs"** tab
   - Should see: `✅ Email configured with Resend API. From: onboarding@resend.dev`

2. **Test Email:**
   - Submit contact form
   - Subscribe to newsletter
   - Create booking
   
3. **Check Logs for Success:**
   - Should see: `INFO Email sent successfully via Resend. Message ID: ...`
   - No more "Network is unreachable" errors!

## Resend Free Tier Limits

✅ **3,000 emails/month** (free)  
✅ **100 emails/day** (free tier limit)  
✅ **API access**  
✅ **Works with Render free tier**

**If you exceed limits:**
- Upgrade to paid plan ($20/month for 50,000 emails)
- Or use multiple email services

## Troubleshooting

**Issue: "Resend not configured"**
- Check `RESEND_API_KEY` is set in Render
- Verify the API key is correct (starts with `re_`)

**Issue: "Invalid API key"**
- Regenerate API key in Resend dashboard
- Update `RESEND_API_KEY` in Render

**Issue: Emails not sending**
- Check Resend dashboard for delivery status
- Verify `DEFAULT_FROM_EMAIL` is valid
- Check Render logs for specific errors

## Alternative: Use Your Own Domain

1. **Verify domain in Resend:**
   - Add domain in Resend dashboard
   - Add DNS records to your domain
   - Verify domain

2. **Update `DEFAULT_FROM_EMAIL`:**
   - Use: `noreply@yourdomain.com`
   - More professional!

## Next Steps

1. ✅ Sign up for Resend
2. ✅ Get API key
3. ✅ Add to Render environment variables
4. ✅ Test email sending
5. ✅ Emails will work on Render free tier!

No more SMTP blocking issues! 🎉

