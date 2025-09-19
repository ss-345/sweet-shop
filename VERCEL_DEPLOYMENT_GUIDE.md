# 🚀 Vercel Deployment Guide - Same Repository

## 📋 Prerequisites

1. **GitHub Repository** with your code
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas** - For production database

## 🎯 **Option 1: Deploy Both as Separate Projects (Recommended)**

### **Step 1: Deploy Backend First**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure Backend Project:**

   - **Project Name:** `sweet-shop-backend`
   - **Framework Preset:** `Other`
   - **Root Directory:** `backend`
   - **Build Command:** `npm run build`
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

5. **Set Environment Variables:**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet_shop
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   ```

6. **Deploy Backend**
7. **Note your backend URL:** `https://sweet-shop-backend.vercel.app`

### **Step 2: Deploy Frontend**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import the SAME GitHub repository**
4. **Configure Frontend Project:**

   - **Project Name:** `sweet-shop-frontend`
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Set Environment Variables:**

   ```
   VITE_API_URL=https://sweet-shop-backend.vercel.app/api
   ```

6. **Deploy Frontend**
7. **Note your frontend URL:** `https://sweet-shop-frontend.vercel.app`

## 🎯 **Option 2: Deploy as Single Project (Monorepo)**

### **Step 1: Deploy from Root**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure Project:**

   - **Project Name:** `sweet-shop`
   - **Framework Preset:** `Other`
   - **Root Directory:** `.` (root)
   - **Build Command:** `npm run build` (in both folders)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install` (in both folders)

5. **Set Environment Variables:**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet_shop
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   VITE_API_URL=https://sweet-shop.vercel.app/api
   ```

6. **Deploy**
7. **Your app will be available at:** `https://sweet-shop.vercel.app`

## 🎯 **Option 3: Using Vercel CLI (Advanced)**

### **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

### **Step 2: Login to Vercel**

```bash
vercel login
```

### **Step 3: Deploy Backend**

```bash
cd backend
vercel --prod
```

### **Step 4: Deploy Frontend**

```bash
cd ../frontend
vercel --prod
```

## 🔧 **Configuration Files Needed**

### **Backend Configuration (`backend/vercel.json`)**

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

### **Frontend Configuration (`frontend/vercel.json`)**

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

### **Root Configuration (`vercel.json`) - For Monorepo**

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

## 🗄️ **Database Setup (MongoDB Atlas)**

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create a free account and cluster**
3. **Create a database user**
4. **Get your connection string**
5. **Whitelist all IP addresses (0.0.0.0/0) for Vercel**

## 🧪 **Testing Your Deployment**

### **Backend Health Check**

- Visit: `https://your-backend-url.vercel.app/api/health`
- Should return: `{"status":"ok"}`

### **Frontend Test**

- Visit your frontend URL
- Try registering a new user
- Try logging in
- Test sweet management (if admin)

## 🐛 **Common Issues & Solutions**

### **Issue 1: CORS Errors**

**Solution:** Update backend CORS configuration:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend-url.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
```

### **Issue 2: Environment Variables Not Working**

**Solution:**

- Make sure variable names match exactly
- Redeploy after adding environment variables
- Check Vercel dashboard for variable values

### **Issue 3: Build Failures**

**Solution:**

- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Check build logs in Vercel dashboard

## 📱 **Final URLs**

After deployment, you'll have:

- **Frontend:** `https://sweet-shop-frontend.vercel.app`
- **Backend:** `https://sweet-shop-backend.vercel.app`

## 🎉 **Success!**

Your Sweet Shop Management System is now live on Vercel!

Users can:

- ✅ Register and login
- ✅ Browse sweets
- ✅ Purchase items
- ✅ Admin can manage inventory
- ✅ State persists across page refreshes

Happy deploying! 🚀
