# Deployment Guide - Vercel

Step-by-step guide to deploy Bright Link School to Vercel.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [x] Production build passes successfully (`npm run build`)
- [x] Code is committed to Git
- [x] GitHub repository is ready
- [ ] Environment variables are ready
- [ ] Database is accessible from the internet (Neon/Vercel Postgres)

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. **Import** your GitHub repository
5. Select the repository: `YOUR_USERNAME/YOUR_REPO`

### Step 3: Configure Project

Vercel will auto-detect Next.js. Verify these settings:

**Framework Preset**: Next.js  
**Root Directory**: `./` (leave default)  
**Build Command**: `npm run build` (auto-detected)  
**Output Directory**: `.next` (auto-detected)  
**Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add all of these:

#### Required Variables

```bash
# Database
DATABASE_URL
postgresql://username:password@host:5432/database?schema=public

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
your_cloud_name

CLOUDINARY_API_KEY
your_api_key

CLOUDINARY_API_SECRET
your_api_secret
```

#### Optional Variables

```bash
# App URL (update after first deployment)
NEXT_PUBLIC_APP_URL
https://your-app.vercel.app
```

**Important**: 
- Set all variables for **Production**, **Preview**, and **Development** environments
- Click the checkboxes for all three environments

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Once done, you'll get a deployment URL like:
   - `https://your-project.vercel.app`

---

## 🔧 Post-Deployment Configuration

### Update App URL

After your first deployment:

1. Go to **Project Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_APP_URL` with your Vercel URL:
   ```
   https://your-project.vercel.app
   ```
3. Click **Save**
4. **Redeploy** to apply changes:
   - Go to **Deployments** tab
   - Click ⋯ menu on latest deployment
   - Click **Redeploy**

### Seed Database (First Time Only)

After first deployment, seed your production database:

```bash
# Option 1: Use local terminal with production DATABASE_URL
DATABASE_URL="your_production_url" npm run db:seed

# Option 2: Use Vercel CLI
vercel env pull .env.local
npm run db:seed
```

### Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain: `www.brightlinkschool.com`
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

---

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

### Manual Deployment via Git

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel deploys automatically!
```

### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

---

## 🐛 Troubleshooting

### Build Fails

**Check build logs in Vercel dashboard:**

1. Go to **Deployments** tab
2. Click on failed deployment
3. View **Build Logs**

**Common issues:**

```bash
# Missing environment variables
❌ Error: Environment variable DATABASE_URL is not set
✅ Fix: Add DATABASE_URL in Project Settings → Environment Variables

# Database connection timeout during build
❌ Error: Can't reach database server
✅ Fix: This is normal during build - database is accessed at runtime

# TypeScript errors
❌ Error: Type 'string' is not assignable to...
✅ Fix: Run `npm run build` locally to see full error
```

### Database Connection Issues

**Problem**: API routes return 500 errors

**Solution**:
```bash
# 1. Verify DATABASE_URL is correct
# 2. Ensure database accepts connections from anywhere (0.0.0.0/0)
# 3. Check Prisma Client is generated:
#    Vercel runs `npm run postinstall` automatically
```

### Environment Variables Not Working

**Problem**: `process.env.VARIABLE_NAME` returns undefined

**Solution**:
- Variables starting with `NEXT_PUBLIC_` are available in browser
- Other variables are only available in server-side code (API routes, server components)
- Redeploy after adding/changing environment variables

### Image Upload Fails

**Problem**: Cloudinary uploads return errors

**Solution**:
```bash
# 1. Verify Cloudinary env vars are set correctly
# 2. Check Cloudinary dashboard for API key status
# 3. Ensure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME has no trailing spaces
```

---

## 📊 Monitoring & Analytics

### View Deployment Logs

1. Go to **Deployments** tab
2. Click on any deployment
3. View **Build Logs** and **Function Logs**

### Check Performance

1. Go to **Analytics** tab (if enabled)
2. Monitor:
   - Page load times
   - Visitor count
   - Error rates

### Function Logs (API Routes)

1. Go to deployment page
2. Click **Functions** tab
3. Select a function to see logs
4. Useful for debugging API issues

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files to Git
- ✅ Use different credentials for production and development
- ✅ Rotate API keys periodically
- ✅ Use Vercel's encrypted environment variables

### Database

- ✅ Use connection pooling (Neon automatically does this)
- ✅ Enable SSL for database connections
- ✅ Regularly backup your database
- ✅ Use separate databases for production and preview

### Admin Access

After deployment:

```bash
# 1. Login as super admin
URL: https://your-app.vercel.app/admin/login
Email: admin@brightlinkschool.edu.pk
Password: Admin@123

# 2. Change default password immediately!
# 3. Create additional admin users as needed
```

---

## 📦 Vercel Project Structure

```
Your Vercel Project
├── Production (main branch)
│   └── https://your-project.vercel.app
│
├── Preview Deployments (other branches)
│   └── https://your-project-git-branch-name.vercel.app
│
└── Development (local)
    └── http://localhost:3000
```

---

## 🎯 Quick Reference

### Deployment URLs

```bash
# Production
https://brightlink-school.vercel.app

# Preview (branch deploys)
https://brightlink-school-git-develop.vercel.app

# Deployment-specific
https://brightlink-school-abc123.vercel.app
```

### Useful Vercel Commands

```bash
# Login
vercel login

# Link local project to Vercel
vercel link

# Pull environment variables
vercel env pull .env.local

# View deployments
vercel ls

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-name]
```

---

## 📝 Deployment Checklist

Use this checklist for every deployment:

### Before Deployment
- [ ] Code is tested locally
- [ ] `npm run build` passes without errors
- [ ] All environment variables are documented
- [ ] Database schema is up to date
- [ ] Changes are committed to Git

### During Deployment
- [ ] Environment variables added in Vercel
- [ ] Build completes successfully
- [ ] No errors in build logs
- [ ] Deployment URL is generated

### After Deployment
- [ ] Test website at deployment URL
- [ ] Test admin login
- [ ] Test all forms (admission, contact, feedback)
- [ ] Test file uploads
- [ ] Verify database connections work
- [ ] Check all pages load correctly
- [ ] Test on mobile devices
- [ ] Update `NEXT_PUBLIC_APP_URL` if needed
- [ ] Seed database (first deployment only)

---

## 🆘 Support & Resources

### Vercel Documentation
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)

### Project Documentation
- `README.md` - Project overview
- `COMMANDS.md` - All project commands
- `CLAUDE.md` - Project instructions
- `SETUP.md` - Initial setup guide

### Get Help
- [Vercel Support](https://vercel.com/support)
- [Next.js Discord](https://nextjs.org/discord)
- [Prisma Discord](https://pris.ly/discord)

---

## ✅ Success Criteria

Your deployment is successful when:

- ✅ Build completes with no errors
- ✅ Website loads at Vercel URL
- ✅ All pages are accessible
- ✅ Forms submit successfully
- ✅ File uploads work (Cloudinary)
- ✅ Admin dashboard is functional
- ✅ Database queries work
- ✅ No console errors in browser

---

**Deployed Successfully?** 🎉

Your Bright Link School website is now live!

Share your deployment URL and start accepting admissions online.

---

**Last Updated**: September 2026
