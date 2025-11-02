# Resend Domain Setup Guide

## Quick Answer

**You can't use Gmail addresses (@gmail.com) directly** - Resend requires verifying a domain you own.

**Two options:**

### Option 1: Use Resend's Test Domain (Quick Start) ✅
- Use: `onboarding@resend.dev`
- Works immediately, no setup needed
- Perfect for testing
- Limit: Can only send to verified email addresses initially

### Option 2: Use Your Own Domain (Professional) 🌟
- Use: `noreply@naildbybola.com` (or your domain)
- More professional
- Can send to anyone
- Requires domain verification

---

## Option 1: Quick Start (Test Domain)

### Use `onboarding@resend.dev`:

1. **In Render Dashboard** → Environment variables:
   - `DEFAULT_FROM_EMAIL` = `onboarding@resend.dev`
   - `RESEND_API_KEY` = `re_xxxxx` (your API key)
   - `ADMIN_EMAIL` = `abiolateslim1@gmail.com` (where you receive notifications)

2. **Important:** When using `onboarding@resend.dev`, you may need to verify recipient emails first:
   - Go to Resend Dashboard → Settings
   - Add verified recipients if needed

**This works immediately!** ✅

---

## Option 2: Use Your Own Domain (Recommended)

### Do You Have a Domain?

If you have a domain like:
- `naildbybola.com`
- `naildbybola.net`
- Any domain you own

### Step 1: Add Domain in Resend

1. **Go to Resend Dashboard:** https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter your domain:** `naildbybola.com` (or your domain)
4. **Resend will show DNS records to add**

### Step 2: Add DNS Records

1. **Go to your domain registrar** (where you bought the domain):
   - GoDaddy, Namecheap, Google Domains, etc.
   
2. **Add DNS records** that Resend shows:
   - Usually 3-4 records (TXT, CNAME, etc.)
   - Example:
     ```
     Type: TXT
     Name: @
     Value: resend._domainkey.your-domain.com
     ```
   
3. **Wait for DNS propagation** (5-60 minutes)

### Step 3: Verify Domain

1. **Go back to Resend Dashboard**
2. **Click "Verify"** on your domain
3. **Wait for verification** (usually takes a few minutes)

### Step 4: Update Render Environment Variables

1. **In Render Dashboard** → Environment:
   - `DEFAULT_FROM_EMAIL` = `noreply@naildbybola.com` (or your domain)
   - `RESEND_API_KEY` = `re_xxxxx`
   - `ADMIN_EMAIL` = `abiolateslim1@gmail.com`

2. **Save** - emails will now send from your domain!

---

## Which Option Should I Use?

### Use Test Domain (`onboarding@resend.dev`) If:
- ✅ You want to test immediately
- ✅ You don't have a domain yet
- ✅ You're okay with test domain for now

### Use Your Own Domain If:
- ✅ You have a domain already
- ✅ You want professional emails
- ✅ You want `noreply@yourdomain.com`

---

## Getting a Domain (If You Don't Have One)

### Option A: Buy a Domain
1. **Go to domain registrar:**
   - Namecheap (cheapest, ~$10/year)
   - GoDaddy
   - Google Domains
   - Cloudflare

2. **Search for domain:**
   - `naildbybola.com`
   - `naildbybola.net`
   - Or any name you like

3. **Purchase** (usually $10-15/year)

### Option B: Use Existing Domain
If you already have a domain from your business, use that!

---

## Current Setup Recommendation

**For now (immediate testing):**
- Use `onboarding@resend.dev` as `DEFAULT_FROM_EMAIL`
- Set `ADMIN_EMAIL` = `abiolateslim1@gmail.com`
- This works immediately!

**Later (when you get domain):**
- Verify domain in Resend
- Change `DEFAULT_FROM_EMAIL` to `noreply@yourdomain.com`
- More professional!

---

## Quick Setup Steps (Test Domain)

1. **Sign up for Resend:** https://resend.com
2. **Get API Key:** https://resend.com/api-keys
3. **In Render Dashboard:**
   - `RESEND_API_KEY` = your API key
   - `DEFAULT_FROM_EMAIL` = `onboarding@resend.dev`
   - `ADMIN_EMAIL` = `abiolateslim1@gmail.com`
4. **Deploy and test!**

**Emails will work immediately with the test domain!** 🎉

