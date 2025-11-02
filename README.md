# Naildby_bola - Professional Nail & Lash Services Website

A modern, responsive website for a nail and lash technician featuring a React frontend and Django REST API backend.

## Features

- **Frontend**: React 18 with Tailwind CSS for modern, mobile-first responsive design
- **Backend**: Django 4.2 REST Framework API with PostgreSQL database
- **Services**: Nail and lash service management
- **Booking System**: Online appointment scheduling with multi-step form
- **Gallery**: Portfolio showcase with filtering and lightbox
- **Contact Forms**: Contact form and newsletter subscription
- **Testimonials**: Client reviews and ratings with submission form
- **Admin Panel**: Django admin for content management
- **Email Notifications**: Beautiful, responsive email templates

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS, Axios, React Hot Toast
- **Backend**: Django 4.2, Django REST Framework, PostgreSQL
- **Containerization**: Docker & Docker Compose with health checks
- **Deployment**: Configured for Render.com (free tier)

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

## Testing the Application

### 1. Test Frontend Pages

Visit each page and verify functionality:

#### Home Page (http://localhost:3000)
- ✅ Hero section displays
- ✅ Featured services load dynamically
- ✅ Featured gallery images display
- ✅ Testimonials carousel works
- ✅ Social media links are correct
- ✅ Newsletter modal opens (if implemented)

#### Services Page (/services)
- ✅ All services display in grid
- ✅ Category filters work
- ✅ Service cards have hover effects
- ✅ "Book This Service" button navigates to booking
- ✅ Prices and durations display correctly

#### Booking Page (/booking)
- ✅ Multi-step form displays
- ✅ Service selection works
- ✅ Calendar date picker functions
- ✅ Time slot selection works
- ✅ Form validation works
- ✅ Submit booking sends to API
- ✅ Success message displays
- ✅ Mobile-responsive layout

#### Gallery Page (/gallery)
- ✅ Images load (or placeholder shows)
- ✅ Category filters work
- ✅ Lightbox opens on image click
- ✅ Lazy loading works
- ✅ Masonry layout displays correctly

#### Testimonials Page (/testimonials)
- ✅ All testimonials display
- ✅ Category filters work
- ✅ "Share Your Experience" button opens modal
- ✅ Testimonial form submits correctly
- ✅ Star rating selector works
- ✅ Mobile carousel functions

#### About Page (/about)
- ✅ Business information displays
- ✅ Contact info is correct
- ✅ Social links work
- ✅ Business hours are correct
- ✅ No certifications section (removed)

#### FAQ Page (/faq)
- ✅ All questions display
- ✅ Search functionality works
- ✅ Accordion expand/collapse works
- ✅ Smooth animations

#### Contact Page (/contact)
- ✅ Contact information displays correctly
- ✅ Form validation works
- ✅ Form submission sends to API
- ✅ Success message displays
- ✅ Newsletter signup works

### 2. Test API Endpoints

Using browser or Postman, test these endpoints:

#### Services
```bash
GET http://localhost:8000/api/services/
GET http://localhost:8000/api/services/?is_featured=true
GET http://localhost:8000/api/services/?category=nails
```

#### Booking
```bash
POST http://localhost:8000/api/booking/
Content-Type: application/json

{
  "service_id": 1,
  "customer_name": "Test User",
  "customer_email": "test@example.com",
  "customer_phone": "+2349021227325",
  "preferred_date": "2024-12-25",
  "preferred_time": "10:00",
  "notes": "Test booking"
}
```

#### Contact
```bash
POST http://localhost:8000/api/contact/
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+2349021227325",
  "subject_type": "general",
  "subject": "Test Subject",
  "message": "Test message"
}
```

#### Newsletter
```bash
POST http://localhost:8000/api/contact/newsletter/
Content-Type: application/json

{
  "email": "test@example.com",
  "name": "Test User"
}
```

#### Testimonials
```bash
GET http://localhost:8000/api/testimonials/
POST http://localhost:8000/api/testimonials/
Content-Type: application/json

{
  "client_name": "Test Client",
  "service_category": "both",
  "rating": 5,
  "review_text": "Great service!"
}
```

#### Gallery
```bash
GET http://localhost:8000/api/gallery/
GET http://localhost:8000/api/gallery/?category=nails
```

### 3. Test Admin Panel

1. **Login** at http://localhost:8000/admin
   - Use your superuser credentials

2. **Test Each Admin Section:**

   **Services**
   - Add a new service
   - Edit service details
   - Set featured status
   - Verify it appears on frontend

   **Bookings**
   - View booking requests
   - Confirm a booking (test email sending)
   - Check booking status updates

   **Contact Messages**
   - View contact form submissions
   - Mark messages as read
   - Verify email notifications

   **Testimonials**
   - Approve pending testimonials
   - Feature testimonials
   - Verify they appear on frontend

   **Gallery**
   - Upload images
   - Set categories
   - Mark as featured
   - Verify on frontend

   **Newsletter Subscribers**
   - View subscriber list
   - Check email addresses
   - Test unsubscribe functionality

### 4. Test Email Functionality

#### Configure Email Settings
In `backend/config/settings/base.py` or via environment variables:
```python
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
DEFAULT_FROM_EMAIL = 'noreply@naildbybola.com'
```

#### Test Email Sending
1. Submit a booking request through the frontend
2. Check console for email sending logs
3. Verify email received (if configured)
4. Check email templates render correctly

### 5. Mobile Testing

#### Responsive Design Tests
1. **Chrome DevTools**:
   - Open DevTools (F12)
   - Click device toolbar icon
   - Test at various sizes:
     - iPhone SE (375px)
     - iPhone 12/13 (390px)
     - iPhone 14 Pro Max (430px)
     - iPad (768px)
     - Desktop (1920px)

2. **Test on Real Device**:
   - Ensure backend URL is accessible from your network
   - Update `REACT_APP_API_URL` if needed
   - Test on actual mobile device

#### Mobile-Specific Tests
- ✅ Navigation hamburger menu works
- ✅ Forms are easy to fill on mobile
- ✅ Touch interactions work smoothly
- ✅ Images load correctly
- ✅ Text is readable without zooming
- ✅ Buttons are large enough for touch

### 6. Test Docker Health Checks

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

### 7. Test Production Build

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

## API Endpoints Reference

### Base URL
- **Development**: http://localhost:8000/api
- **Production**: https://naillash-backend.onrender.com/api

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
1. Navigate to http://localhost:8000/admin
2. Login with superuser credentials

### Managing Content

**Services Management**
- Add/edit service name, price, duration
- Set category (nails, lashes, both)
- Mark as featured
- Add description

**Booking Management**
- View all booking requests
- Confirm bookings (sends confirmation email)
- Filter by status (pending, confirmed, cancelled)
- View customer details

**Testimonials Management**
- Approve/reject testimonial submissions
- Mark as featured for homepage
- Edit testimonial content
- Filter by category and rating

**Gallery Management**
- Upload images
- Set image categories
- Add titles and descriptions
- Mark images as featured

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

## Troubleshooting

### Frontend Not Loading
- Check Docker containers are running: `docker-compose ps`
- Check frontend logs: `docker-compose logs frontend`
- Verify port 3000 is not in use
- Rebuild frontend: `docker-compose build frontend --no-cache`

### Backend API Errors
- Check backend logs: `docker-compose logs backend`
- Verify database is running: `docker-compose ps db`
- Check migrations ran: `docker-compose exec backend python manage.py showmigrations`
- Restart backend: `docker-compose restart backend`

### Database Issues
- Reset database: `docker-compose down -v && docker-compose up`
- Check database connection in settings
- Verify environment variables are set

### Build Errors
- Clear Docker cache: `docker-compose build --no-cache`
- Delete node_modules and rebuild: `cd frontend && rm -rf node_modules && npm install`
- Check Docker has enough resources (4GB+ RAM recommended)

### API Connection Issues
- Verify backend is running: http://localhost:8000/api/services/
- Check CORS settings in backend
- Verify REACT_APP_API_URL environment variable
- Check browser console for errors

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
│   │   └── settings/
│   │       ├── base.py     # Base settings
│   │       ├── dev.py      # Development settings
│   │       └── prod.py      # Production settings
│   ├── templates/
│   │   └── emails/         # Email templates
│   ├── Dockerfile          # Backend container
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
├── README.md               # This file
├── setup.sh                # Linux/macOS setup script
└── setup.bat               # Windows setup script
```

---

## Deployment to Render

### Prerequisites
- Render.com account (free tier available)
- GitHub repository connected

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Services on Render**
   - Go to Render Dashboard
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Select `render.yaml` file
   - Render will auto-detect services

3. **Environment Variables**
   - Set in Render dashboard for each service:
     - `SECRET_KEY` (auto-generated)
     - `DEBUG=False`
     - `ALLOWED_HOSTS=your-backend-url.onrender.com`
     - `EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`
     - Database connection strings (auto-set from PostgreSQL service)

4. **Deploy**
   - Render will build and deploy automatically
   - Monitor build logs
   - Wait for services to be healthy

5. **Update Frontend API URL**
   - In Render, set `REACT_APP_API_URL` to your backend URL
   - Rebuild frontend service

---

## Support & Contact

**Business Information:**
- **Name**: Naildby_bola
- **Address**: 06, Akin Akinyemi Str, Ikolaba Main Estate
- **Phone**: +234 902 122 7325
- **Email**: oladunnimariam32@gmail.com
- **Instagram**: [@ibadan_nailandlashtech](https://www.instagram.com/ibadan_nailandlashtech)
- **TikTok**: [@ibadan.nail.tech](https://www.tiktok.com/@ibadan.nail.tech)

**Business Hours:**
- Monday - Saturday: 9:00 AM - 7:00 PM
- Sunday: 10:00 AM - 5:00 PM

---

## License

This project is licensed under the MIT License.
