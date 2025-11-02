# Comprehensive Testing Guide

## Pre-Testing Checklist

Before testing, ensure:
- [ ] Docker Desktop is running
- [ ] All containers are built and running
- [ ] Database migrations have completed
- [ ] Admin user has been created
- [ ] Ports 3000 (frontend) and 8000 (backend) are available

---

## Test Scenarios

### 1. Frontend Visual & Responsive Tests

#### Home Page
1. Open http://localhost:3000
2. Verify hero section displays with gradient background
3. Check "Book Appointment" button works
4. Scroll down and verify:
   - Featured services section loads
   - Gallery images display (or placeholders)
   - Testimonials carousel works
   - Social media links are correct
5. Test mobile view (F12 → Toggle device toolbar):
   - Navigation collapses to hamburger menu
   - All sections stack vertically
   - Images resize appropriately
   - Buttons are touch-friendly

#### Services Page
1. Navigate to /services
2. Test category filters:
   - Click "All Services" → shows all
   - Click "Nail Services" → filters correctly
   - Click "Lash Services" → filters correctly
3. Verify service cards:
   - Hover effects work
   - Prices display correctly
   - "Book This Service" button navigates to booking
4. Mobile: Cards stack in single column

#### Booking Flow
1. Navigate to /booking
2. Step 1 - Service Selection:
   - Services load from API
   - Click a service → proceeds to step 2
3. Step 2 - Date Selection:
   - Calendar displays
   - Can select future dates only
   - Click date → proceeds to step 3
4. Step 3 - Time Selection:
   - Time slots display
   - Select time → proceeds to step 4
5. Step 4 - Customer Info:
   - Fill all required fields
   - Submit form
   - Verify success message
   - Check email was sent (if configured)
6. Mobile: All steps work smoothly on touch

#### Gallery Page
1. Navigate to /gallery
2. Test category filters
3. Click on image → lightbox opens
4. Navigate between images in lightbox
5. Verify lazy loading (check Network tab)
6. Mobile: Images responsive, lightbox works on touch

#### Testimonials Page
1. Navigate to /testimonials
2. Test filters
3. Click "Share Your Experience"
4. Fill testimonial form:
   - Enter name
   - Select category
   - Select star rating
   - Write review
   - Submit
5. Verify form closes and success message shows
6. Check admin panel for pending testimonial

#### FAQ Page
1. Navigate to /faq
2. Test search:
   - Type "booking" → filters questions
   - Type "invalid" → shows no results message
3. Test accordion:
   - Click question → expands smoothly
   - Click again → collapses
4. Verify animations work

#### Contact Page
1. Navigate to /contact
2. Verify contact info is correct:
   - Address: 06, Akin Akinyemi Str, Ikolaba Main Estate
   - Phone: +234 902 122 7325
   - Email: oladunnimariam32@gmail.com
   - Hours: Mon-Sat 9AM-7PM, Sun 10AM-5PM
3. Fill contact form and submit
4. Verify success message
5. Check newsletter signup in footer

#### About Page
1. Navigate to /about
2. Verify:
   - No certifications section
   - Business name is "Naildby_bola"
   - Contact info is correct
   - Social links work
   - Business hours are correct

---

### 2. API Endpoint Tests

#### Using Browser Console
Open browser console (F12) and test:

```javascript
// Test Services API
fetch('http://localhost:8000/api/services/')
  .then(r => r.json())
  .then(data => console.log('Services:', data));

// Test Gallery API
fetch('http://localhost:8000/api/gallery/')
  .then(r => r.json())
  .then(data => console.log('Gallery:', data));

// Test Testimonials API
fetch('http://localhost:8000/api/testimonials/')
  .then(r => r.json())
  .then(data => console.log('Testimonials:', data));
```

#### Using curl (PowerShell)
```powershell
# Test Services
curl http://localhost:8000/api/services/

# Test Booking (POST)
curl -X POST http://localhost:8000/api/booking/ `
  -H "Content-Type: application/json" `
  -d '{"service_id":1,"customer_name":"Test","customer_email":"test@test.com","customer_phone":"+2349021227325","preferred_date":"2024-12-25","preferred_time":"10:00"}'
```

---

### 3. Form Submission Tests

#### Booking Form
1. Go to /booking
2. Complete all steps
3. Submit form
4. Expected:
   - Loading spinner shows
   - Success toast message
   - Form resets or shows confirmation
   - Booking appears in admin panel
   - Email sent (if configured)

#### Contact Form
1. Go to /contact
2. Fill all fields
3. Submit
4. Expected:
   - Success message
   - Message appears in admin
   - Email notification sent

#### Testimonial Form
1. Go to /testimonials
2. Click "Share Your Experience"
3. Fill form (including star rating)
4. Submit
5. Expected:
   - Modal closes
   - Success message
   - Testimonial appears in admin (pending approval)

#### Newsletter Form
1. Scroll to footer or open newsletter modal
2. Enter email (and optional name)
3. Submit
4. Expected:
   - Success message
   - Email in subscriber list (admin)
   - Welcome email sent (if configured)

---

### 4. Admin Panel Tests

#### Access Admin
1. Go to http://localhost:8000/admin
2. Login with superuser credentials

#### Add Test Data

**Services:**
- Click "Services" → "Add Service"
- Fill: Name, Price, Duration, Category, Description
- Save
- Verify it appears on frontend

**Gallery:**
- Click "Gallery Images" → "Add Gallery Image"
- Upload image
- Set category and title
- Mark as featured
- Verify on frontend homepage

**Testimonials:**
- Find pending testimonial from form submission
- Click to edit
- Approve it
- Mark as featured
- Verify appears on frontend

**Confirm Booking:**
- Go to "Booking Requests"
- Find a booking
- Click "Confirm" or edit status
- Verify confirmation email sent

---

### 5. Mobile Testing Checklist

Test on actual mobile device or Chrome DevTools:

- [ ] Navigation menu works on mobile
- [ ] All pages load correctly
- [ ] Forms are easy to fill
- [ ] Buttons are large enough
- [ ] Text is readable without zoom
- [ ] Images load and display correctly
- [ ] Touch interactions work smoothly
- [ ] No horizontal scrolling
- [ ] Booking flow works on mobile
- [ ] Calendar picker works on mobile
- [ ] Lightbox works on mobile

---

### 6. Email Template Tests

If email is configured:

1. **Booking Confirmation Email:**
   - Submit booking
   - Check email inbox
   - Verify email is beautiful and responsive
   - Check all booking details are correct

2. **Booking Notification (to owner):**
   - Submit booking as customer
   - Check owner email
   - Verify notification email received

3. **Contact Notification:**
   - Submit contact form
   - Check owner email

4. **Newsletter Welcome:**
   - Subscribe to newsletter
   - Check subscriber email
   - Verify welcome email received

---

### 7. Performance Tests

1. **Page Load Speed:**
   - Open DevTools → Network tab
   - Reload pages
   - Check load times (should be < 3s)

2. **Image Optimization:**
   - Check images use lazy loading
   - Verify images are optimized
   - Test on slow 3G connection

3. **API Response Time:**
   - Check Network tab for API calls
   - Should respond in < 500ms

---

### 8. Error Handling Tests

1. **Disconnect Backend:**
   - Stop backend: `docker-compose stop backend`
   - Try submitting forms
   - Verify error messages display
   - Check console for errors

2. **Invalid Form Data:**
   - Submit forms with missing required fields
   - Verify validation errors show
   - Submit invalid email formats
   - Submit invalid phone numbers

3. **404 Handling:**
   - Navigate to /nonexistent-page
   - Verify 404 page or redirect

---

### 9. Browser Compatibility Tests

Test in multiple browsers:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on macOS)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Common Issues & Solutions

### Issue: Frontend shows "Cannot GET /"
**Solution:** 
- Frontend build failed
- Check: `docker-compose logs frontend`
- Rebuild: `docker-compose build frontend --no-cache`

### Issue: API calls fail with CORS error
**Solution:**
- Check CORS settings in `backend/config/settings/base.py`
- Verify `CORS_ALLOWED_ORIGINS` includes `http://localhost:3000`

### Issue: Database connection errors
**Solution:**
- Check database is running: `docker-compose ps db`
- Restart: `docker-compose restart db`
- Check connection string in settings

### Issue: Images not loading
**Solution:**
- Check image URLs in admin panel
- Verify MEDIA_URL and MEDIA_ROOT settings
- Check nginx serves media files correctly

### Issue: Email not sending
**Solution:**
- Verify email settings in settings.py
- Check EMAIL_HOST_USER and EMAIL_HOST_PASSWORD
- Test SMTP connection
- Check spam folder

---

## Test Data Seeding (Optional)

Create sample data for testing:

```bash
# Access backend container
docker-compose exec backend python manage.py shell

# Then run Python commands to create test data
```

Or use Django admin to manually add:
- 5-10 services
- 3-5 gallery images
- 5-10 testimonials
- 2-3 bookings

---

## Performance Benchmarks

Expected performance:
- **Homepage load**: < 2 seconds
- **API response**: < 500ms
- **Image load**: < 1 second per image
- **Form submission**: < 1 second
- **Page transitions**: Smooth, no lag

---

## Security Tests

1. **XSS Protection:**
   - Try submitting scripts in forms
   - Verify they are escaped

2. **CSRF Protection:**
   - Verify forms have CSRF tokens
   - Check Django CSRF middleware enabled

3. **Input Validation:**
   - Test SQL injection attempts
   - Test special characters in forms
   - Verify backend validates all inputs

---

## Accessibility Tests

- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] Buttons have aria labels
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast meets WCAG standards

---

## Final Verification Checklist

Before deployment:
- [ ] All pages load correctly
- [ ] All forms submit successfully
- [ ] All API endpoints respond
- [ ] Admin panel fully functional
- [ ] Mobile responsive on all pages
- [ ] Email templates render correctly
- [ ] No console errors
- [ ] No linting errors
- [ ] Docker builds successfully
- [ ] All contact info is correct
- [ ] Social links work
- [ ] Business hours are correct

