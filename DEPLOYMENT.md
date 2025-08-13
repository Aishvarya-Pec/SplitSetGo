# 🚀 SplitSetGO Deployment Guide

## ⚠️ **Current Issue: JWT Template Error**
The error "No JWT template exists with name: convex" means the Convex backend isn't properly configured.

## 🔧 **Quick Fix Steps:**

### 1. **Set up Convex Backend:**
```bash
# Install Convex CLI globally
npm install -g convex

# Login to Convex
npx convex dev --configure

# This will:
# - Create a new Convex project
# - Generate convex.json
# - Set up environment variables
# - Deploy your schema and functions
```

### 2. **Update Environment Variables:**
After running `npx convex dev --configure`, update your `.env.local`:

```bash
# Copy the generated values from Convex CLI
NEXT_PUBLIC_CONVEX_URL=https://your-generated-url.convex.cloud
CONVEX_DEPLOY_KEY=your-generated-deploy-key
```

### 3. **Deploy to Convex:**
```bash
# Deploy your schema and functions
npx convex deploy

# Start development with Convex
npx convex dev
```

## 🌐 **Alternative: Use Mock Mode**

If you want to test without Convex, you can temporarily disable it:

### Update `components/convex-client-provider.jsx`:
```jsx
"use client";

import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

// Use mock URL if Convex isn't configured
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://mock.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }) {
  // Check if Convex is properly configured
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">Convex Not Configured</h2>
        <p className="text-gray-600">Please run: npx convex dev --configure</p>
      </div>
    );
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
```

## 📋 **Required Environment Variables:**

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://clerk.com

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=https://your-app.convex.cloud
CONVEX_DEPLOY_KEY=your_deploy_key

# Email Service
RESEND_API_KEY=re_...

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🚨 **Troubleshooting:**

### If Convex CLI fails:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall Convex
npm install convex@latest

# Try again
npx convex dev --configure
```

### If JWT error persists:
1. **Verify Convex project exists** in dashboard.convex.dev
2. **Check JWT template** is configured for "convex"
3. **Ensure domain matches** your Clerk configuration

## 🔗 **Resources:**
- [Convex Documentation](https://docs.convex.dev/)
- [Clerk + Convex Setup](https://docs.convex.dev/auth/clerk)
- [Convex Dashboard](https://dashboard.convex.dev/)

---

**After following these steps, your SplitSetGO app should work without the JWT error!** 🎉
