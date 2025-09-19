# 🚀 Sweet Shop Management System - Vercel Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas** - For production database (free tier available)

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string
5. Whitelist all IP addresses (0.0.0.0/0) for Vercel

## 🔧 Backend Deployment

### Step 1: Prepare Backend for Vercel

1. **Create `backend/vercel.json`:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

2. **Update `backend/package.json` scripts:**

```json
{
  "scripts": {
    "start": "node src/server.js",
    "build": "echo 'No build step required'",
    "dev": "cross-env NODE_ENV=development nodemon src/server.js",
    "test": "cross-env NODE_ENV=test jest --runInBand"
  }
}
```

### Step 2: Deploy Backend to Vercel

1. **Install Vercel CLI:**

```bash
npm install -g vercel
```

2. **Login to Vercel:**

```bash
vercel login
```

3. **Deploy Backend:**

```bash
cd backend
vercel --prod
```

4. **Set Environment Variables in Vercel Dashboard:**

   - Go to your project in Vercel dashboard
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet_shop
     JWT_SECRET=your-super-secret-jwt-key-here
     NODE_ENV=production
     ```

5. **Note your backend URL** (e.g., `https://sweet-shop-backend.vercel.app`)

## 🎨 Frontend Deployment

### Step 1: Update Frontend Configuration

1. **Update `frontend/src/services/api.js`:**

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://your-backend-url.vercel.app/api";
```

2. **Create `frontend/vercel.json`:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Step 2: Deploy Frontend to Vercel

1. **Deploy Frontend:**

```bash
cd frontend
vercel --prod
```

2. **Set Environment Variables in Vercel Dashboard:**
   - Go to your frontend project in Vercel dashboard
   - Go to Settings → Environment Variables
   - Add this variable:
     ```
     VITE_API_URL=https://your-backend-url.vercel.app/api
     ```

## 🔄 Alternative: Deploy Both from Root

### Option 1: Separate Repositories

- Create separate GitHub repositories for frontend and backend
- Deploy each separately to Vercel

### Option 2: Monorepo with Vercel

1. **Update root `vercel.json`:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

## 🧪 Testing Deployment

1. **Test Backend:**

   - Visit: `https://your-backend-url.vercel.app/api/health`
   - Should return: `{"status":"ok"}`

2. **Test Frontend:**
   - Visit your frontend URL
   - Try registering a new user
   - Try logging in
   - Test sweet management (if admin)

## 🐛 Common Issues & Solutions

### Issue 1: CORS Errors

**Solution:** Update backend CORS configuration:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend-url.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
```

### Issue 2: Environment Variables Not Working

**Solution:**

- Make sure variable names match exactly
- Redeploy after adding environment variables
- Check Vercel dashboard for variable values

### Issue 3: Database Connection Issues

**Solution:**

- Check MongoDB Atlas connection string
- Ensure IP whitelist includes Vercel IPs
- Verify database user permissions

### Issue 4: Build Failures

**Solution:**

- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Check build logs in Vercel dashboard

## 📱 Final URLs

After deployment, you'll have:

- **Frontend:** `https://your-frontend-name.vercel.app`
- **Backend:** `https://your-backend-name.vercel.app`

## 🔐 Security Notes

1. **Never commit `.env` files**
2. **Use strong JWT secrets**
3. **Limit MongoDB Atlas IP whitelist in production**
4. **Enable HTTPS only**
5. **Regular security updates**

## 🎉 Success!

Your Sweet Shop Management System is now live on Vercel!

Users can:

- ✅ Register and login
- ✅ Browse sweets
- ✅ Purchase items
- ✅ Admin can manage inventory
- ✅ State persists across page refreshes

Happy deploying! 🚀
