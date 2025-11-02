# Media Files in Production

## ✅ Fixed: Media Files Now Serve

Media files are now configured to be served in production. The fix includes:
- Added media file serving route in `urls.py` for production
- Media files at `/media/` will now be accessible

## ⚠️ Important Limitation: Render Free Tier

**Render's free tier does NOT provide persistent storage.**

This means:
- ❌ Files uploaded via Django admin will be **lost when the container restarts**
- ❌ Files uploaded via admin will be **lost on every deployment**
- ✅ Files committed to Git and included in the Docker image will persist

## Current Solutions

### Option 1: Commit Images to Git (Current Workaround)

1. **Add images to your repository:**
   ```bash
   # Place images in backend/media/ directory
   backend/media/gallery/nail-pic.jpg
   backend/media/services/lash-pic.jpg
   ```

2. **These images will be:**
   - ✅ Included in the Docker build
   - ✅ Available in production
   - ✅ Persist across deployments
   - ❌ Can't be changed via admin (need to redeploy)

3. **To add new images:**
   - Add files to `backend/media/` locally
   - Commit and push to Git
   - Render will rebuild with new images

### Option 2: Use Cloud Storage (Recommended for Production)

For a production-ready solution, use cloud storage:

#### A. AWS S3 (Recommended)
- **Pros:** Reliable, scalable, affordable
- **Setup:**
  1. Create AWS S3 bucket
  2. Install: `pip install django-storages boto3`
  3. Configure in `settings/prod.py`:
     ```python
     DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
     AWS_STORAGE_BUCKET_NAME = 'your-bucket-name'
     AWS_S3_REGION_NAME = 'us-east-1'
     ```
  4. Files uploaded via admin will be stored in S3

#### B. Cloudinary (Easiest)
- **Pros:** Free tier available, image optimization built-in
- **Setup:**
  1. Sign up at https://cloudinary.com
  2. Install: `pip install django-cloudinary-storage`
  3. Configure in `settings/prod.py`
  4. Files uploaded via admin will be stored in Cloudinary

## Uploading Images via Admin (Current Setup)

Even though files won't persist on free tier, you can still upload:

1. **Go to Admin Panel:**
   - `https://naildbybola-backend.onrender.com/admin/`

2. **Upload images:**
   - Go to Services → Add/Edit Service
   - Upload image via file field
   - Images will be accessible until next restart/deployment

3. **Note:** 
   - These images will be lost on restart
   - For persistence, use Option 1 (Git) or Option 2 (Cloud Storage)

## Testing Media Files

After deployment, test:
- ✅ `https://naildbybola-backend.onrender.com/media/gallery/nail-pic.jpg`
- ✅ `https://naildbybola-backend.onrender.com/media/services/lash-pic.jpg`

Should return images (if they exist in the Docker container).

## Recommended Next Steps

1. **Short term:** Commit images to Git (works for static images)
2. **Long term:** Set up AWS S3 or Cloudinary for dynamic uploads
3. **Production:** Use cloud storage for scalability and reliability

## Current Status

✅ **Media files are now served** (404 errors fixed)
⚠️ **Uploaded files won't persist** (Render free tier limitation)
✅ **Committed images will work** (included in Docker build)

