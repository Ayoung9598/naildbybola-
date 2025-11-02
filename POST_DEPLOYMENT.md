# Post-Deployment Steps

## 📋 After Your Code is Deployed

Once Render finishes deploying your services, follow these steps:

---

## ✅ Step 1: Verify Deployment

1. **Check all services are "Live"** in Render Dashboard:
   - ✅ `naildbybola-db` (PostgreSQL) - should be "Available"
   - ✅ `naildbybola-backend` (Django) - should be "Live"
   - ✅ `naildbybola` (React) - should be "Live"

2. **Test URLs**:
   - Frontend: `https://naildbybola.onrender.com`
   - Backend API: `https://naildbybola-backend.onrender.com/api/services/`
   - Admin: `https://naildbybola-backend.onrender.com/admin` (will show login page)

---

## 👤 Step 2: Create Admin User

**This is done manually - NOT automatic!**

### Option A: Using Render Shell (Recommended)

1. Go to Render Dashboard
2. Click on **`naildbybola-backend`** service
3. Click **"Shell"** tab (in the left sidebar)
4. Run:
   ```bash
   python manage.py createsuperuser
   ```
5. Enter:
   - **Username**: (choose your admin username)
   - **Email**: oladunnimariam32@gmail.com (or your email)
   - **Password**: (create a strong password - enter twice)

6. ✅ Done! Now you can login at:
   `https://naildbybola-backend.onrender.com/admin`

### Option B: Using Render Environment Variables

You can also create a superuser via environment variable, but Shell is easier.

---

## 📧 Step 3: Add Email Environment Variables

Go to **`naildbybola-backend`** service → **"Environment"** tab

Add these variables (they're set to `sync: false` so you must add them manually):

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=oladunnimariam32@gmail.com
EMAIL_HOST_PASSWORD=your-16-char-gmail-app-password
DEFAULT_FROM_EMAIL=oladunnimariam32@gmail.com
```

**After adding variables:**
- Click **"Save Changes"**
- Render will automatically restart the service

---

## 📝 Step 4: Add Initial Content

1. Login to Admin Panel: `https://naildbybola-backend.onrender.com/admin`
2. Add content:
   - **Services** (with images)
   - **Gallery Images** (with before/after pairs if needed)
   - **Testimonials** (if you have any)

---

## 🧪 Step 5: Test Everything

1. **Frontend**: Visit `https://naildbybola.onrender.com`
   - Check services display
   - Check gallery images
   - Test booking form
   - Test contact form
   - Test newsletter subscription

2. **Email Notifications**:
   - Submit a test booking
   - Check admin receives booking notification email
   - Confirm booking in admin
   - Check customer receives confirmation email

---

## 🔄 Future Updates

After initial setup, any code changes:

```bash
# Make changes locally
git add .
git commit -m "Description of changes"
git push origin main

# Render automatically detects and deploys! ✨
```

No need to create admin user again - it persists in the database.

---

## ⚠️ Important Notes

### Admin User Creation:
- ❌ **NOT created automatically**
- ✅ **Created once manually** (then persists forever)
- 🔐 **Store your admin credentials securely**
- 📧 **Use the email you'll access for password resets**

### Database:
- ✅ Data persists across deployments
- ✅ Admin user persists
- ✅ All content persists
- ⚠️ **Media files (images) don't persist** on free tier (consider Cloudinary/S3)

---

## 🆘 Troubleshooting

### "No such command: createsuperuser"
- Make sure you're in the backend service Shell
- Try: `python manage.py help` to see available commands

### "Cannot connect to database"
- Check database service is running
- Verify `DATABASE_URL` environment variable is set (auto-set by Render)

### "Static files not loading"
- Check build logs for `collectstatic` step
- Verify WhiteNoise is configured correctly

---

**You're all set!** 🎉

