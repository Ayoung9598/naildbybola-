# GitHub Setup & First Deployment Guide

## 📦 Step-by-Step: From Local Code to Production

Since your code is only local, follow these steps in order:

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com
2. **Click "New"** (or the "+" icon) → "New repository"
3. **Repository Settings**:
   - Repository name: `nailed-lash` (or `naildbybola` if you prefer)
   - Description: "Professional Nail & Lash Services Website"
   - **Visibility**: Choose **Private** (recommended) or Public
   - ❌ **DO NOT** check "Initialize with README" (you already have files)
   - ❌ **DO NOT** add .gitignore (you already have one)
   - ❌ **DO NOT** add license
4. **Click "Create repository"**

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create nailed-lash --private --source=. --remote=origin --push
```

---

## Step 2: Initialize Git (if not already done)

Check if you already have a git repository:

```bash
git status
```

### If you see "not a git repository":

```bash
# Initialize git
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Production-ready nail & lash website"
```

### If git is already initialized:

Just check what's committed:
```bash
git status
```

---

## Step 3: Add GitHub as Remote

After creating the repository on GitHub, you'll see instructions. Use these commands:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nailed-lash.git

# Or if you prefer SSH (if you have SSH keys set up):
# git remote add origin git@github.com:YOUR_USERNAME/nailed-lash.git

# Verify remote was added
git remote -v
```

---

## Step 4: Push to GitHub

```bash
# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Note**: GitHub may ask for authentication:
- Use a **Personal Access Token** (not your password)
- Create one at: https://github.com/settings/tokens
- Select scopes: `repo` (full control of private repositories)

---

## Step 5: Verify on GitHub

1. Go to: `https://github.com/YOUR_USERNAME/nailed-lash`
2. Verify you see all your files:
   - `backend/`
   - `frontend/`
   - `docker-compose.yml`
   - `render.yaml`
   - `.gitignore`
   - etc.

---

## Step 6: Deploy to Render

Now that your code is on GitHub, deploy to Render:

### 6.1: Go to Render Dashboard

1. Visit: https://dashboard.render.com
2. **Sign up** (if you don't have an account)
   - Can sign up with GitHub (recommended)

### 6.2: Create Blueprint (Automatic Deployment)

1. Click **"New +"** → **"Blueprint"**
2. **Connect GitHub** (if not already connected)
   - Authorize Render to access your repositories
3. **Select Repository**: Choose `nailed-lash` (or your repo name)
4. **Render will detect `render.yaml`** automatically ✅
5. **Review Services**:
   - PostgreSQL Database (naildbybola-db)
   - Django Backend (naildbybola-backend)
   - React Frontend (naildbybola)
6. Click **"Apply"** to start deployment

### 6.3: Add Environment Variables

After services are created (may take a few minutes), add secrets:

#### For Database Service (`naildbybola-db`):
1. Go to the database service → **"Environment"** tab
2. Add:
   - `POSTGRES_DB` = `naildbybola_db`
   - `POSTGRES_USER` = `your_username` (choose a secure username)
   - `POSTGRES_PASSWORD` = `your_secure_password` (strong password!)

#### For Backend Service (`naildbybola-backend`):
1. Go to the backend service → **"Environment"** tab
2. Add these variables (they're set to `sync: false` in render.yaml):

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=oladunnimariam32@gmail.com
EMAIL_HOST_PASSWORD=your-16-char-gmail-app-password
DEFAULT_FROM_EMAIL=oladunnimariam32@gmail.com
```

**Note**: `SECRET_KEY` and database credentials are auto-configured by Render from the database service.

### 6.4: Wait for Deployment

- First deployment takes **5-10 minutes**
- Watch the build logs in Render dashboard
- Services will be available when status shows "Live"

---

## Step 7: Test Production URLs

Once deployment completes:

1. **Frontend**: `https://naildbybola.onrender.com`
2. **Backend API**: `https://naildbybola-backend.onrender.com/api/services/`
3. **Admin Panel**: `https://naildbybola-backend.onrender.com/admin`

---

## Step 8: Create Admin User

1. Go to backend service → **"Shell"** tab in Render
2. Run:
   ```bash
   python manage.py createsuperuser
   ```
3. Enter username, email, and password
4. Now you can access admin panel!

---

## Step 9: Future Updates

After initial deployment, any future changes are automatic:

```bash
# Make changes locally
# ...

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Render automatically detects changes and redeploys! 🚀
```

---

## 🔐 Security Checklist Before Pushing

Make sure `.env` is NOT committed:

```bash
# Check .gitignore includes .env
cat .gitignore
```

Should see:
```
.env
.env.local
.env.*.local
```

**Double-check**:
```bash
# This should return nothing (file is ignored)
git check-ignore .env
```

If it returns `.env`, you're safe! ✅

---

## 🚨 Troubleshooting

### "Repository not found"
- Check repository name matches
- Verify you're authenticated with GitHub
- Make sure repository exists and you have access

### "Permission denied"
- Use Personal Access Token instead of password
- Check token has `repo` scope

### "Environment variables not working"
- Make sure you added them in Render Dashboard
- Check for typos in variable names
- Restart the service after adding variables

### "Build failed"
- Check Render logs for errors
- Verify `requirements.txt` has all dependencies
- Make sure Dockerfiles are correct

---

## ✅ Quick Command Summary

```bash
# 1. Check git status
git status

# 2. If not initialized, initialize
git init
git add .
git commit -m "Initial commit"

# 3. Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nailed-lash.git

# 4. Push to GitHub
git branch -M main
git push -u origin main

# 5. Then go to Render Dashboard and deploy!
```

---

## 🎯 What Happens After

- ✅ Code is backed up on GitHub
- ✅ Automatic deployments on every push
- ✅ Your app is live and accessible worldwide
- ✅ No need for local Docker Desktop
- ✅ Free hosting forever (with free tier limits)

---

**You're ready to go!** Start with Step 1 above. 🚀

