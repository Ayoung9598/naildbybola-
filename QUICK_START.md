# Quick Start Guide

## 🚀 Fastest Way to Run the App

### Option 1: Using Docker (Recommended - 5 minutes)

1. **Ensure Docker Desktop is running**

2. **Start everything:**
   ```bash
   docker-compose up --build
   ```
   Wait for all services to start (2-3 minutes first time)

3. **Create admin user** (in a new terminal):
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```
   Enter: username, email, password

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:8000/admin (use your credentials)

5. **Stop when done:**
   ```bash
   docker-compose down
   ```

---

### Option 2: Local Development (10 minutes)

#### Backend Setup:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Backend runs on: http://localhost:8000

#### Frontend Setup (in new terminal):
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

---

## ✅ Quick Verification

1. **Frontend loads?** → Open http://localhost:3000
2. **Backend works?** → Open http://localhost:8000/api/services/
3. **Admin works?** → Open http://localhost:8000/admin

If all three work → ✅ App is running correctly!

---

## 📝 Next Steps

1. Add sample data via admin panel
2. Test booking form submission
3. Test contact form
4. Check mobile responsiveness

For detailed testing, see **TESTING_GUIDE.md**

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000  # Windows
# Kill the process or change port
```

**Docker build fails?**
```bash
# Clean build
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

**Database connection error?**
```bash
# Restart database
docker-compose restart db
# Wait 10 seconds, then restart backend
docker-compose restart backend
```

