# Cloudinary Setup Guide

## Why Cloudinary?

✅ **Free tier** (25GB storage, 25GB bandwidth/month)  
✅ **Image optimization** and transformation built-in  
✅ **CDN delivery** (fast global delivery)  
✅ **Persistent storage** (files won't be lost on Render restarts)  
✅ **Easy integration** with Django

## Step 1: Create Cloudinary Account

1. **Go to:** https://cloudinary.com
2. **Sign up** for a free account (or sign in if you have one)
3. **Verify your email** (if required)

## Step 2: Get Your Credentials

1. **Go to Dashboard:** https://cloudinary.com/console
2. **Copy these 3 values** from the dashboard:
   - **Cloud Name** (e.g., `dabcdefgh`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

⚠️ **Keep your API Secret safe!** Don't commit it to Git.

## Step 3: Add Credentials to Render

1. **Go to Render Dashboard:**
   - https://dashboard.render.com
   - Click on `naildbybola-backend` service

2. **Go to Environment Tab:**
   - Click **"Environment"** tab
   - Scroll to environment variables

3. **Add These 3 Variables:**
   
   Click **"Add Environment Variable"** for each:
   
   - **Key**: `CLOUDINARY_CLOUD_NAME`
     **Value**: `your-cloud-name` (from Cloudinary dashboard)
   
   - **Key**: `CLOUDINARY_API_KEY`
     **Value**: `your-api-key` (from Cloudinary dashboard)
   
   - **Key**: `CLOUDINARY_API_SECRET`
     **Value**: `your-api-secret` (from Cloudinary dashboard)

4. **Save Changes:**
   - Render will automatically redeploy the service

## Step 4: Verify It's Working

1. **Check Render Logs:**
   - Go to backend service → **"Logs"** tab
   - Look for: No warning about Cloudinary credentials
   - Should see successful deployment

2. **Test Image Upload:**
   - Go to: `https://naildbybola-backend.onrender.com/admin/`
   - Login with your admin credentials
   - Go to **Services** → **Add Service**
   - Upload an image
   - **Save** the service

3. **Check Image URL:**
   - In the admin, view the service you just created
   - The image URL should be a Cloudinary URL like:
     ```
     https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/services/image.jpg
     ```

4. **Test in Frontend:**
   - Go to your frontend: `https://naildbybola.onrender.com`
   - Images should load correctly
   - URLs should be Cloudinary CDN URLs

## Step 5: Migrate Existing Images (If Any)

If you have existing services/images in the database:

1. **Go to Admin Panel**
2. **Edit each service/gallery item** that has an image
3. **Re-upload the image** (this will upload to Cloudinary)
4. **Save** - the image will now be stored in Cloudinary

## How It Works

- **When you upload an image** via Django admin → automatically uploaded to Cloudinary
- **Image URLs** returned by API → Cloudinary CDN URLs
- **Images are optimized** automatically by Cloudinary
- **Files persist** even when Render containers restart
- **CDN delivery** = fast loading globally

## Troubleshooting

**Issue: Images still not loading**
- Check that all 3 Cloudinary env vars are set correctly in Render
- Verify the values match your Cloudinary dashboard exactly
- Check Render logs for errors

**Issue: "Cloudinary credentials not set" warning**
- Make sure all 3 environment variables are set in Render
- Redeploy the service after adding variables

**Issue: Images upload but don't display**
- Check the image URL format in admin
- Verify the image exists in Cloudinary dashboard
- Check browser console for errors

**Issue: Images work in admin but not frontend**
- Check API response - images should have Cloudinary URLs
- Verify CORS is configured correctly
- Check browser network tab for image requests

## Cloudinary Free Tier Limits

✅ **25 GB** storage  
✅ **25 GB** bandwidth/month  
✅ Unlimited transformations  
✅ Free forever (with limits)

**If you exceed limits:**
- Pay-as-you-go pricing
- Or upgrade to a paid plan

## Next Steps

1. ✅ Set up Cloudinary account
2. ✅ Add credentials to Render
3. ✅ Upload images via admin
4. ✅ Images will be stored permanently in Cloudinary
5. ✅ No more 404 errors!
6. ✅ Fast CDN delivery

Your media files are now production-ready! 🎉

