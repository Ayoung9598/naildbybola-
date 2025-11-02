# Verify Cloudinary Environment Variables

## Issue: Cloudinary Not Detected

If you see this warning in logs:
```
⚠️  Cloudinary credentials not set. Using local media storage...
```

This means Django isn't reading your Cloudinary environment variables.

## Step 1: Verify Variable Names in Render

1. **Go to Render Dashboard:**
   - https://dashboard.render.com
   - Click on `naildbybola-backend` service
   - Click **"Environment"** tab

2. **Verify these EXACT variable names exist (case-sensitive!):**
   - ✅ `CLOUDINARY_CLOUD_NAME` (not `CLOUDINARY_CLOUD` or `CLOUD_NAME`)
   - ✅ `CLOUDINARY_API_KEY` (not `API_KEY` or `CLOUDINARY_KEY`)
   - ✅ `CLOUDINARY_API_SECRET` (not `API_SECRET` or `CLOUDINARY_SECRET`)

3. **Check for typos:**
   - Look for extra spaces before/after the key name
   - Make sure there are no underscores missing
   - Verify the spelling matches exactly

## Step 2: Verify Values Are Set

For each variable, make sure:
- ✅ **Value is not empty**
- ✅ **No extra spaces** before/after the value
- ✅ **Value matches** what's in your Cloudinary dashboard

## Step 3: Manual Redeploy

After adding/updating variables:

1. **Save the environment variables** in Render
2. **Manually trigger a redeploy:**
   - Click **"Manual Deploy"** button
   - Or wait for auto-deploy (may take a minute)

3. **Check logs again:**
   - Should see: `✅ Cloudinary configured successfully. Cloud Name: ...`
   - Should NOT see: `⚠️  Cloudinary credentials not set...`

## Step 4: Verify Cloudinary Dashboard

1. **Go to:** https://cloudinary.com/console
2. **Verify your credentials:**
   - Dashboard URL should show your cloud name
   - Settings → Account → API Keys should show your key and secret

## Common Issues

### Issue: Variables set but still not working
**Solution:**
- Delete and re-add each variable
- Make sure no trailing spaces
- Redeploy manually

### Issue: Wrong variable names
**Solution:**
- Delete old variables with wrong names
- Add new ones with exact names: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### Issue: Values copied incorrectly
**Solution:**
- Re-copy from Cloudinary dashboard
- Make sure you copy the entire value (no truncation)
- Check for hidden characters

## After Fix

Once configured correctly, you should see in logs:
```
✅ Cloudinary configured successfully. Cloud Name: your-cloud...
```

Then when you upload images via admin:
- Images will be stored in Cloudinary
- Image URLs will be Cloudinary CDN URLs
- Images will persist across deployments

