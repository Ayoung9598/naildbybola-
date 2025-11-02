# Frontend API URL Fix

## Problem
Frontend was using `localhost:8000` instead of the production API URL `https://naildbybola-backend.onrender.com/api`.

## Solution
Updated `frontend/Dockerfile` to:
1. Accept `REACT_APP_API_URL` as a build argument
2. Set default value to production URL (works even if Render doesn't pass it)
3. Make it available as an environment variable during build

## How It Works

The Dockerfile now has:
```dockerfile
ARG REACT_APP_API_URL=https://naildbybola-backend.onrender.com/api
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
```

This means:
- If Render passes the env var as a build arg → uses that value
- If not → uses the default production URL
- React will replace `process.env.REACT_APP_API_URL` at build time

## After Deployment

After pushing and Render rebuilds:
1. The frontend will use: `https://naildbybola-backend.onrender.com/api`
2. All API calls will work correctly
3. No more `localhost:8000` errors

## Verify It's Fixed

1. Open browser DevTools → Console
2. Check Network tab
3. API calls should go to: `https://naildbybola-backend.onrender.com/api/...`
4. No more `ERR_CONNECTION_REFUSED` errors

