#!/bin/bash

echo "🚀 Sweet Shop Management System - Vercel Deployment"
echo "=================================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Deploying Backend..."
cd backend
vercel --prod
echo "✅ Backend deployed!"

echo "📦 Deploying Frontend..."
cd ../frontend
vercel --prod
echo "✅ Frontend deployed!"

echo "🎉 Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Set environment variables in Vercel dashboard"
echo "2. Update frontend API URL with backend URL"
echo "3. Test your deployed application"
echo ""
echo "🔗 Check your Vercel dashboard for deployment URLs"
