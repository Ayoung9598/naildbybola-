# Naildby_bola - Professional Nail & Lash Services Website

A modern, responsive website for a nail and lash technician featuring a React frontend and Django REST API backend.

## Features

- **Frontend**: React 18 with Tailwind CSS for modern, mobile-first responsive design
- **Backend**: Django 4.2 REST Framework API with PostgreSQL database
- **Services**: Nail and lash service management with image uploads
- **Booking System**: Online appointment scheduling with multi-step form
- **Gallery**: Portfolio showcase with filtering, lightbox, and zoom functionality
- **Contact Forms**: Contact form and newsletter subscription
- **Testimonials**: Client reviews and ratings with submission form
- **Admin Panel**: Django admin for content management
- **Email Notifications**: Beautiful, responsive HTML email templates
- **Production Ready**: Deployed on Render.com with Cloudinary and Resend integration

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS, Axios, React Hot Toast, yet-another-react-lightbox
- **Backend**: Django 4.2, Django REST Framework, PostgreSQL
- **Containerization**: Docker & Docker Compose with health checks
- **Deployment**: Render.com (free tier compatible)
- **Media Storage**: Cloudinary (free tier)
- **Email Service**: Resend API (works with Render free tier)
- **Database**: PostgreSQL (managed by Render)

---

## Quick Start with Docker (Recommended)

### Prerequisites
- Docker Desktop installed and running
- Git
- Windows 10/11 or macOS/Linux

### Step 1: Clone and Navigate
```bash
git clone <repository-url>
cd nailed-lash
```

### Step 2: Start All Services
```bash
# Build and start all containers (database, backend, frontend)
docker-compose up --build
```

This will:
- Start PostgreSQL database
- Build and start Django backend
- Build React app and serve with nginx
- Run database migrations automatically

### Step 3: Create Admin User
Open a new terminal and run:
```bash
docker-compose exec backend python manage.py createsuperuser
```
Follow the prompts to create your admin account:
- Username: admin
- Email: (your email)
- Password: (create a secure password)

### Step 4: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin
  - Login with your admin credentials

### Step 5: Stop Services
Press `Ctrl+C` in the terminal, then:
```bash
docker-compose down
```

To stop and remove volumes (clean database):
```bash
docker-compose down -v
```

---

## Development Setup (Without Docker)

### Backend Development

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   # Windows
   python -m venv my_venv
   my_venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**
   - Install PostgreSQL locally
   - Create database: `naillash_db`
   - Or use SQLite for development (update settings)

5. **Create .env file** (optional)
   ```bash
   # Copy and edit with your settings
   # Defaults will work for local development
   ```

6. **Run migrations**
   ```bash
   python manage.py migrate
   ```

7. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start development server**
   ```bash
   python manage.py runserver
   ```
   Backend will run on: http://localhost:8000

### Frontend Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   Frontend will run on: http://localhost:3000
   - Auto-opens in browser
   - Hot reload enabled
   - Proxies API requests to http://localhost:8000

---

## Production Deployment Guide

### Prerequisites
- GitHub account
- Render.com account (free tier available)
- Resend account (for email - free tier available)
- Cloudinary account (for media storage - free tier available)

---

## Step 1: GitHub Setup

### Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Click "New"** (or the "+" icon) → "New repository"
3. **Repository Settings**:
   - Repository name: `nailed-lash` (or your preferred name)
   - Description: "Professional Nail & Lash Services Website"
   - **Visibility**: Choose **Private** (recommended) or Public
   - ❌ **DO NOT** check "Initialize with README" (you already have files)
   - ❌ **DO NOT** add .gitignore (you already have one)
   - ❌ **DO NOT** add license
4. **Click "Create repository"**

### Initialize Git and Push

```bash
# Check if git is already initialized
git status

# If not initialized:
git init
git add .
git commit -m "Initial commit: Production-ready nail & lash website"

# Add GitHub as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nailed-lash.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: GitHub may ask for authentication:
- Use a **Personal Access Token** (not your password)
- Create one at: https://github.com/settings/tokens
- Select scopes: `repo` (full control of private repositories)

### Security Checklist Before Pushing

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

## Step 2: Deploy to Render.com

### 2.1: Create Blueprint (Automatic Deployment)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Sign up** (if you don't have an account)
   - Can sign up with GitHub (recommended)
3. **Click "New +"** → **"Blueprint"**
4. **Connect GitHub** (if not already connected)
   - Authorize Render to access your repositories
5. **Select Repository**: Choose `nailed-lash` (or your repo name)
6. **Render will detect `render.yaml`** automatically ✅
7. **Review Services**:
   - PostgreSQL Database (naildbybola-db)
   - Django Backend (naildbybola-backend)
   - React Frontend (naildbybola)
8. **Click "Apply"** to start deployment

### 2.2: Environment Variables Setup

After services are created (may take a few minutes), add environment variables:

#### For Backend Service (`naildbybola-backend`):

Go to backend service → **"Environment"** tab and add:

**Required Variables:**
```
DEBUG=False
ALLOWED_HOSTS=naildbybola-backend.onrender.com
DJANGO_SETTINGS_MODULE=config.settings.prod
```

**Database Variables** (auto-set by Render from PostgreSQL service):
- `DB_HOST` - Auto-set via `fromDatabase`
- `DB_PORT` - Auto-set via `fromDatabase`
- `DB_NAME` - Auto-set via `fromDatabase`
- `DB_USER` - Auto-set via `fromDatabase`
- `DB_PASSWORD` - Auto-set via `fromDatabase`

**Email Configuration** (see Resend Setup below):
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
DEFAULT_FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=your-email@gmail.com
```

**Cloudinary Configuration** (see Cloudinary Setup below):
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Superuser Creation** (optional - see below):
```
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@naildbybola.com
DJANGO_SUPERUSER_PASSWORD=YourStrongPassword123!
```

**Note**: `SECRET_KEY` is auto-generated by Render.

#### For Frontend Service (`naildbybola`):

```
REACT_APP_API_URL=https://naildbybola-backend.onrender.com/api
```

### 2.3: Wait for Deployment

- First deployment takes **5-10 minutes**
- Watch the build logs in Render dashboard
- Services will be available when status shows "Live"

### 2.4: Test Production URLs

Once deployment completes:

1. **Frontend**: `https://naildbybola.onrender.com`
2. **Backend API**: `https://naildbybola-backend.onrender.com/api/`
3. **Admin Panel**: `https://naildbybola-backend.onrender.com/admin`

---

## Step 3: Create Admin User (Render Free Tier)

Since Render free tier doesn't support Shell access, we use environment variables:

### Method: Using Environment Variables

1. **In Render Dashboard** → Backend service → **Environment** tab

2. **Add These 3 Variables**:
   - **Key**: `DJANGO_SUPERUSER_USERNAME`
     **Value**: `admin` (or your preferred username)
   
   - **Key**: `DJANGO_SUPERUSER_EMAIL`
     **Value**: `admin@naildbybola.com` (your email)
   
   - **Key**: `DJANGO_SUPERUSER_PASSWORD`
     **Value**: `YourStrongPassword123!` (use a strong password)

3. **Save Changes** - Render will automatically redeploy

4. **Check Logs** - Look for:
   ```
   👤 Checking for superuser creation...
   ✅ Successfully created superuser "admin" with email "admin@naildbybola.com"
   ```

5. **⚠️ IMPORTANT**: After the superuser is created, **remove the password variable** for security:
   - Go back to **Environment** tab
   - **Delete** `DJANGO_SUPERUSER_PASSWORD`
   - Keep username and email if you want (they're harmless)

6. **Login to Admin**:
   - Go to: `https://naildbybola-backend.onrender.com/admin/`
   - Username: The username you set
   - Password: The password you set

The superuser will still exist in the database, but the password won't be in environment variables anymore.

---

## Step 4: Resend Email Setup (Required for Production)

### Why Resend?

✅ **Works on Render free tier** (uses HTTP API, not blocked SMTP)  
✅ **Free tier:** 3,000 emails/month  
✅ **No SMTP needed** (uses HTTP API)  
✅ **Easy setup** and reliable  

**Note**: Render free tier blocks outbound SMTP traffic, so Resend is required.

### 4.1: Create Resend Account

1. **Go to**: https://resend.com
2. **Sign up** for a free account
3. **Verify your email**

### 4.2: Get Your API Key

1. **Go to Dashboard**: https://resend.com/api-keys
2. **Create API Key**:
   - Click **"Create API Key"**
   - Give it a name (e.g., "NaildbyBola Production")
   - Copy the API key (starts with `re_...`)

⚠️ **Keep your API key safe!** Don't commit it to Git.

### 4.3: Add to Render Environment Variables

1. **Go to Render Dashboard** → Backend service → **Environment** tab

2. **Add These Variables**:
   
   - **Key**: `RESEND_API_KEY`
     **Value**: `re_xxxxxxxxxxxxx` (your Resend API key)
   
   - **Key**: `DEFAULT_FROM_EMAIL`
     **Value**: `onboarding@resend.dev` (Resend's test domain)
   
   - **Key**: `ADMIN_EMAIL`
     **Value**: `your-email@gmail.com` (where you receive notifications)

3. **Save Changes** - Render will automatically redeploy

### 4.4: Verify It Works

1. **Check Render Logs**:
   - Go to backend service → **"Logs"** tab
   - Should see: `✅ Email configured with Resend API. From: onboarding@resend.dev`

2. **Test Email**:
   - Submit contact form
   - Subscribe to newsletter
   - Create booking
   
3. **Check Logs for Success**:
   - Should see: `INFO Email sent successfully via Resend. Message ID: ...`
   - No more "Network is unreachable" errors!

### 4.5: Using Your Own Domain (Optional)

If you have a domain and want to send from `noreply@yourdomain.com`:

1. **Go to Resend Dashboard**: https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter your domain**: `yourdomain.com`
4. **Add DNS records** that Resend shows to your domain registrar
5. **Wait for DNS propagation** (5-60 minutes)
6. **Verify domain** in Resend dashboard
7. **Update `DEFAULT_FROM_EMAIL`** in Render to `noreply@yourdomain.com`

### Resend Free Tier Limits

✅ **3,000 emails/month** (free)  
✅ **100 emails/day** (free tier limit)  
✅ **API access**  
✅ **Works with Render free tier**

---

## Step 5: Cloudinary Setup (Required for Media Files)

### Why Cloudinary?

✅ **Free tier** (25GB storage, 25GB bandwidth/month)  
✅ **Image optimization** and transformation built-in  
✅ **CDN delivery** (fast global delivery)  
✅ **Persistent storage** (files won't be lost on Render restarts)  
✅ **Easy integration** with Django

**Note**: Render free tier has non-persistent storage, so images uploaded locally will be lost. Cloudinary solves this.

### 5.1: Create Cloudinary Account

1. **Go to**: https://cloudinary.com
2. **Sign up** for a free account (or sign in if you have one)
3. **Verify your email** (if required)

### 5.2: Get Your Credentials

1. **Go to Dashboard**: https://cloudinary.com/console
2. **Copy these 3 values** from the dashboard:
   - **Cloud Name** (e.g., `dabcdefgh`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

⚠️ **Keep your API Secret safe!** Don't commit it to Git.

### 5.3: Add Credentials to Render

1. **Go to Render Dashboard** → Backend service → **Environment** tab

2. **Add These 3 Variables**:
   
   - **Key**: `CLOUDINARY_CLOUD_NAME`
     **Value**: `your-cloud-name` (from Cloudinary dashboard)
   
   - **Key**: `CLOUDINARY_API_KEY`
     **Value**: `your-api-key` (from Cloudinary dashboard)
   
   - **Key**: `CLOUDINARY_API_SECRET`
     **Value**: `your-api-secret` (from Cloudinary dashboard)

3. **Save Changes** - Render will automatically redeploy

### 5.4: Verify It's Working

1. **Check Render Logs**:
   - Go to backend service → **"Logs"** tab
   - Should see: `✅ Cloudinary configured successfully. Cloud Name: ...`

2. **Test Image Upload**:
   - Go to: `https://naildbybola-backend.onrender.com/admin/`
   - Login with your admin credentials
   - Go to **Services** → **Add Service**
   - Upload an image
   - **Save** the service

3. **Check Image URL**:
   - In the admin, view the service you just created
   - The image URL should be a Cloudinary URL like:
     ```
     https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/services/image.jpg
     ```

4. **Test in Frontend**:
   - Go to your frontend: `https://naildbybola.onrender.com`
   - Images should load correctly
   - URLs should be Cloudinary CDN URLs

### 5.5: Migrate Existing Images (If Any)

If you have existing services/images in the database:

1. **Go to Admin Panel**
2. **Edit each service/gallery item** that has an image
3. **Re-upload the image** (this will upload to Cloudinary)
4. **Save** - the image will now be stored in Cloudinary

### Cloudinary Free Tier Limits

✅ **25 GB** storage  
✅ **25 GB** bandwidth/month  
✅ **Unlimited transformations**  
✅ **Free forever** (with limits)

---

## API Endpoints Reference

### Base URL
- **Development**: http://localhost:8000/api
- **Production**: https://naildbybola-backend.onrender.com/api

### Endpoints

**Services**
- `GET /api/services/` - List all services
- `GET /api/services/?is_featured=true` - Featured services
- `GET /api/services/?category=nails` - Filter by category

**Booking**
- `POST /api/booking/` - Create booking request
- `GET /api/booking/` - List all bookings (admin)
- `POST /api/booking/{id}/confirm/` - Confirm booking

**Contact**
- `POST /api/contact/` - Send contact message
- `POST /api/contact/newsletter/` - Subscribe to newsletter
- `GET /api/contact/` - List messages (admin)

**Testimonials**
- `GET /api/testimonials/` - List approved testimonials
- `POST /api/testimonials/` - Submit testimonial
- `GET /api/testimonials/?is_featured=true` - Featured testimonials
- `GET /api/testimonials/?service_category=nails` - Filter by category

**Gallery**
- `GET /api/gallery/` - List all images
- `GET /api/gallery/?is_featured=true` - Featured images
- `GET /api/gallery/?category=nails` - Filter by category

---

## Admin Panel Guide

### Accessing Admin
1. Navigate to http://localhost:8000/admin (development) or https://naildbybola-backend.onrender.com/admin (production)
2. Login with superuser credentials

### Managing Content

**Services Management**
- Add/edit service name, price, duration
- Upload service images (stored in Cloudinary in production)
- Set category (nails, lashes, both)
- Mark as featured
- Add description

**Booking Management**
- View all booking requests
- Confirm bookings (sends confirmation email via Resend)
- Filter by status (pending, confirmed, cancelled)
- View customer details

**Testimonials Management**
- Approve/reject testimonial submissions
- Mark as featured for homepage
- Edit testimonial content
- Filter by category and rating

**Gallery Management**
- Upload images (stored in Cloudinary in production)
- Set image categories (nails, lashes, work, before_after)
- Add titles and descriptions
- Mark images as featured
- For "before_after" category, upload comparison images

**Contact Management**
- View contact form submissions
- Mark messages as read
- Filter by subject type
- Reply to messages

**Newsletter Management**
- View subscriber list
- Manually add/remove subscribers
- See subscription dates

---

## Testing the Application

### 1. Test Frontend Pages

Visit each page and verify functionality:

#### Home Page
- ✅ Hero section displays
- ✅ Featured services load dynamically
- ✅ Featured gallery images display
- ✅ Testimonials carousel works
- ✅ Social media links are correct
- ✅ Newsletter modal opens

#### Services Page
- ✅ All services display in grid
- ✅ Category filters work
- ✅ Service cards have hover effects
- ✅ "Book This Service" button navigates to booking
- ✅ Prices display with ₦ (Naira) currency
- ✅ Service images load correctly

#### Booking Page
- ✅ Multi-step form displays
- ✅ Service selection works
- ✅ Calendar date picker functions
- ✅ Time slot selection works
- ✅ Form validation works
- ✅ Submit booking sends to API
- ✅ Success message displays
- ✅ Mobile-responsive layout

#### Gallery Page
- ✅ Images load from Cloudinary (production)
- ✅ Category filters work
- ✅ Lightbox opens on image click with zoom functionality
- ✅ Lazy loading works
- ✅ Masonry layout displays correctly

#### Testimonials Page
- ✅ All testimonials display
- ✅ Category filters work
- ✅ "Share Your Experience" button opens modal
- ✅ Testimonial form submits correctly
- ✅ Star rating selector works
- ✅ Mobile carousel functions

#### Contact Page
- ✅ Contact information displays correctly
- ✅ WhatsApp link included
- ✅ Form validation works
- ✅ Form submission sends to API
- ✅ Success message displays
- ✅ Newsletter signup works (text color is black for visibility)

### 2. Test Email Functionality

#### In Development
Configure email settings in `backend/config/settings/dev.py` or via environment variables:
```python
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
DEFAULT_FROM_EMAIL = 'noreply@naildbybola.com'
```

#### In Production
Emails are sent via Resend API (configured in Render environment variables).

#### Test Email Sending
1. Submit a booking request through the frontend
2. Check Render logs for email sending confirmation
3. Verify email received (check your inbox)
4. Admin confirms booking → customer receives confirmation email
5. Check email templates render correctly

### 3. Test Docker Health Checks

```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Test backend health
curl http://localhost:8000/api/services/

# Test frontend
curl http://localhost:3000
```

### 4. Test Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Test production build locally
npx serve -s build

# Or test with Docker
docker-compose build frontend
docker-compose up frontend
```

---

## Troubleshooting

### Frontend Not Loading
- Check Docker containers are running: `docker-compose ps`
- Check frontend logs: `docker-compose logs frontend`
- Verify port 3000 is not in use
- Rebuild frontend: `docker-compose build frontend --no-cache`
- In production: Check Render logs for build errors

### Backend API Errors
- Check backend logs: `docker-compose logs backend` (development) or Render logs (production)
- Verify database is running: `docker-compose ps db`
- Check migrations ran: `docker-compose exec backend python manage.py showmigrations`
- Restart backend: `docker-compose restart backend`
- In production: Check that all environment variables are set correctly

### Database Issues
- Reset database: `docker-compose down -v && docker-compose up`
- Check database connection in settings
- Verify environment variables are set
- In production: Check Render database service is running

### Build Errors
- Clear Docker cache: `docker-compose build --no-cache`
- Delete node_modules and rebuild: `cd frontend && rm -rf node_modules && npm install`
- Check Docker has enough resources (4GB+ RAM recommended)
- In production: Check Render build logs for specific errors

### API Connection Issues
- Verify backend is running: http://localhost:8000/api/services/ (development)
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` environment variable is set correctly
- In production: Ensure frontend uses production API URL (not localhost)
- Check browser console for errors

### Images Not Loading (Production)
- Verify Cloudinary credentials are set in Render environment variables
- Check Render logs for Cloudinary configuration messages
- Verify images are uploaded via admin (they'll be stored in Cloudinary)
- Check image URLs in API response - should be Cloudinary CDN URLs
- Re-upload images if they're still pointing to local paths

### Emails Not Sending (Production)
- Verify Resend API key is set in Render environment variables
- Check `DEFAULT_FROM_EMAIL` and `ADMIN_EMAIL` are set
- Check Render logs for email sending errors
- Verify Resend account is active and has credits
- Check spam folder for emails
- For first-time recipients, verify email in Resend dashboard if needed

### Superuser Creation Failed
- Check all 3 environment variables are set: `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_EMAIL`, `DJANGO_SUPERUSER_PASSWORD`
- Verify Render has redeployed after adding variables
- Check Render logs for creation messages
- If user already exists, try different username/email
- Remove password variable after creation for security

### Frontend Using Localhost in Production
- Verify `REACT_APP_API_URL` is set in Render frontend service environment variables
- Check that frontend Dockerfile uses the environment variable correctly
- Rebuild frontend service after setting environment variable
- Clear browser cache and hard refresh

### 500 Internal Server Error
- Check Render logs for detailed error messages
- Verify database migrations ran successfully
- Check that all required environment variables are set
- Verify Cloudinary and Resend credentials are correct
- Check database connection is working

---

## Project Structure

```
nailed-lash/
├── backend/                 # Django REST API
│   ├── apps/
│   │   ├── booking/        # Booking models, views, serializers
│   │   ├── contact/        # Contact & newsletter
│   │   ├── gallery/        # Gallery images
│   │   ├── services/       # Services catalog
│   │   └── testimonials/   # Client reviews
│   ├── config/             # Django settings
│   │   ├── apps.py         # Config app registration
│   │   ├── email_backends.py  # Custom Resend email backend
│   │   ├── management/
│   │   │   └── commands/
│   │   │       └── create_superuser_from_env.py  # Auto superuser creation
│   │   ├── settings/
│   │   │   ├── base.py     # Base settings
│   │   │   ├── dev.py      # Development settings
│   │   │   └── prod.py     # Production settings
│   │   └── urls.py         # URL configuration
│   ├── templates/
│   │   └── emails/         # Email templates
│   │       ├── booking_confirmation.html
│   │       ├── booking_notification.html
│   │       ├── contact_notification.html
│   │       └── newsletter_welcome.html
│   ├── Dockerfile          # Backend container
│   ├── entrypoint.sh       # Runtime script (migrations, superuser)
│   ├── requirements.txt    # Python dependencies
│   └── manage.py
│
├── frontend/               # React application
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Footer
│   │   │   ├── NewsletterSignup.js
│   │   │   └── TestimonialForm.js
│   │   ├── pages/          # All page components
│   │   ├── services/       # API client
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # Entry point
│   │   └── index.css       # Global styles
│   ├── Dockerfile          # Multi-stage build
│   ├── nginx.conf          # Nginx config
│   ├── package.json        # Node dependencies
│   └── tailwind.config.js  # Tailwind config
│
├── docker-compose.yml      # Docker orchestration
├── render.yaml             # Render.com deployment config
├── .gitignore             # Git ignore rules
├── README.md               # This file
├── setup.sh                # Linux/macOS setup script
└── setup.bat               # Windows setup script
```

---

## Future Updates

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

## Environment Variables Reference

### Backend (Development)
Create `.env` file in `backend/` directory:
```
DEBUG=True
SECRET_KEY=your-secret-key
DB_NAME=naillash_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

### Backend (Production - Render)
Set in Render Dashboard → Backend Service → Environment:
```
DEBUG=False
SECRET_KEY=auto-generated-by-render
ALLOWED_HOSTS=naildbybola-backend.onrender.com
DJANGO_SETTINGS_MODULE=config.settings.prod
DB_HOST=fromDatabase
DB_PORT=fromDatabase
DB_NAME=fromDatabase
DB_USER=fromDatabase
DB_PASSWORD=fromDatabase
RESEND_API_KEY=re_xxxxxxxxxxxxx
DEFAULT_FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=your-email@gmail.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
DJANGO_SUPERUSER_USERNAME=admin (optional)
DJANGO_SUPERUSER_EMAIL=admin@naildbybola.com (optional)
DJANGO_SUPERUSER_PASSWORD=YourPassword123! (optional - remove after creation)
```

### Frontend (Production - Render)
Set in Render Dashboard → Frontend Service → Environment:
```
REACT_APP_API_URL=https://naildbybola-backend.onrender.com/api
```

---

## Support & Contact

**Business Information:**
- **Name**: Naildby_bola
- **Address**: 06, Akin Akinyemi Str, Ikolaba Main Estate
- **Phone**: +234 902 122 7325
- **Email**: oladunnimariam32@gmail.com
- **Instagram**: [@ibadan_nailandlashtech](https://www.instagram.com/ibadan_nailandlashtech)
- **TikTok**: [@ibadan.nail.tech](https://www.tiktok.com/@ibadan.nail.tech)
- **WhatsApp**: +234 902 122 7325

**Business Hours:**
- Monday - Saturday: 9:00 AM - 7:00 PM
- Sunday: 10:00 AM - 5:00 PM

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- **Render.com** for free tier hosting
- **Cloudinary** for free tier media storage
- **Resend** for email API service
- **Django** and **React** communities for excellent documentation
