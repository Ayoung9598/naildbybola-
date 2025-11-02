# Troubleshooting 500 Error on API Endpoints

## The Issue
Backend root endpoint (`/`) works, but API endpoints like `/api/services/` return 500 Server Error.

## Most Likely Causes

### 1. Database Connection Issue ⚠️ (Most Common)
The database credentials might not be properly linked or migrations failed.

**Check in Render Dashboard:**
1. Go to `naildbybola-backend` service
2. Click **"Logs"** tab
3. Look for errors like:
   - `django.db.utils.OperationalError`
   - `could not connect to server`
   - `relation "services_service" does not exist` (means migrations didn't run)

**Solution:**
- Check if migrations ran in build logs
- Verify database variables are set correctly
- Run migrations manually via Shell

### 2. Migrations Not Run
BuildCommand includes migrations, but they might have failed silently.

**Check:**
1. Go to `naildbybola-backend` → **"Logs"** tab
2. Scroll to build section
3. Look for: `python manage.py migrate`
4. Check if it shows errors

**Manual Fix:**
1. Go to backend service → **"Shell"** tab
2. Run:
   ```bash
   python manage.py migrate
   ```
3. Check output for errors

### 3. Database Tables Don't Exist
If migrations didn't run, tables won't exist, causing 500 errors when querying.

**Fix:**
Run migrations manually (see above).

---

## Quick Debugging Steps

### Step 1: Check Render Logs
1. Go to Render Dashboard
2. Click `naildbybola-backend` service
3. Click **"Logs"** tab
4. Look for red error messages
5. Scroll to see if migrations ran

### Step 2: Test Database Connection
1. Go to backend service → **"Shell"** tab
2. Run:
   ```python
   python manage.py shell
   ```
3. Then in shell:
   ```python
   from django.db import connection
   cursor = connection.cursor()
   cursor.execute("SELECT 1")
   print("Database connected!")
   ```
4. If this fails, database connection is the issue

### Step 3: Check Environment Variables
1. Go to backend service → **"Environment"** tab
2. Verify these exist and have values:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
3. If any are missing, database connection will fail

### Step 4: Run Migrations Manually
1. Go to backend service → **"Shell"** tab
2. Run:
   ```bash
   python manage.py migrate
   ```
3. Check for errors

### Step 5: Create a Test Service
1. Go to **"Shell"** tab
2. Run:
   ```python
   python manage.py shell
   ```
3. Then:
   ```python
   from apps.services.models import Service
   Service.objects.all()
   ```
4. If this works, database is fine
5. If it fails, check the error message

---

## Common Error Messages

### `relation "services_service" does not exist`
**Cause:** Migrations didn't run  
**Fix:** Run `python manage.py migrate` in Shell

### `could not connect to server`
**Cause:** Database credentials wrong or database not accessible  
**Fix:** Check environment variables in Render Dashboard

### `psycopg2.OperationalError`
**Cause:** Database connection timeout or credentials issue  
**Fix:** Verify DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD are correct

---

## Quick Fix Commands

Run these in Render Shell (backend service):

```bash
# Check database connection
python manage.py dbshell

# Run migrations
python manage.py migrate

# Check if tables exist
python manage.py showmigrations

# Create superuser (if needed)
python manage.py createsuperuser
```

---

## Next Steps

1. ✅ Check Render logs for specific error
2. ✅ Verify database environment variables
3. ✅ Run migrations manually if needed
4. ✅ Test API endpoint again

**After fixing, push the code change I made (email settings) to prevent future issues.**

