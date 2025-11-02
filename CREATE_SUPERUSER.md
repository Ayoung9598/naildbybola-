# Creating a Superuser in Production

## Method 1: Using Render Shell (Recommended)

1. **Go to Render Dashboard**
   - Navigate to https://dashboard.render.com
   - Click on your `naildbybola-backend` service

2. **Open Shell**
   - Click on the **"Shell"** tab (next to Logs, Metrics, etc.)
   - A terminal window will open

3. **Run the createsuperuser command**
   ```bash
   python manage.py createsuperuser
   ```

4. **Follow the prompts**
   - **Username**: Enter your admin username (e.g., `admin`)
   - **Email address**: Enter your email (e.g., `admin@naildbybola.com`)
   - **Password**: Enter a strong password (it will ask twice)

   ⚠️ **Important**: The password won't be visible as you type (this is normal for security)

5. **Done!**
   - You can now log in at: `https://naildbybola-backend.onrender.com/admin/`

---

## Method 2: Using Environment Variables (Alternative)

If you prefer, you can create a superuser using environment variables, but this is less secure and not recommended for production.

---

## After Creating Superuser

1. **Login to Admin Portal**
   - Go to: https://naildbybola-backend.onrender.com/admin/
   - Use the username and password you just created

2. **Add Initial Data**
   - Create Services (Nails, Lashes, etc.)
   - Upload service images
   - Add Gallery images
   - Manage bookings, testimonials, etc.

---

## Security Tips

- ✅ Use a strong, unique password
- ✅ Don't share admin credentials
- ✅ Consider enabling 2FA if possible
- ✅ Regularly update your password
- ✅ Only use admin account for admin tasks

---

## Troubleshooting

**Issue: "createsuperuser" command not found**
- Make sure you're in the Shell tab of the backend service
- The command should work from the `/app` directory

**Issue: "Permission denied"**
- Check that you're accessing the correct service
- Verify the database connection is working

**Issue: Can't type password**
- This is normal - passwords are hidden for security
- Type your password and press Enter, then confirm it

