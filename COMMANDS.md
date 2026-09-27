# Bright Link School - Project Commands

Quick reference guide for all project commands.

---

## 📦 Installation

```bash
# Install dependencies
npm install
```

---

## 🚀 Development

```bash
# Start development server
npm run dev

# Development server will run at:
# http://localhost:3000
```

---

## 🏗️ Build & Production

```bash
# Create production build
npm run build

# Start production server (after build)
npm start

# Build and start production in one go
npm run build && npm start
```

---

## 🗄️ Database Commands

### Prisma Client

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate
# OR
npx prisma generate

# Regenerate Prisma Client after npm install (runs automatically)
npm run postinstall
```

### Database Sync

```bash
# Push schema changes to database (development)
npm run db:push
# OR
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name migration_name
```

### Database Seeding

```bash
# Seed database with initial data
npm run db:seed

# Includes:
# - Super Admin account
# - Sample faculty members
# - Sample events
# - Sample feedback/testimonials
```

### Prisma Studio

```bash
# Open Prisma Studio (database GUI)
npm run db:studio
# OR
npx prisma studio

# Opens at: http://localhost:5555
```

### Database Reset

```bash
# ⚠️ WARNING: This will delete all data!

# Reset database and re-run migrations
npx prisma migrate reset

# Reset and seed
npx prisma migrate reset && npm run db:seed
```

---

## 🧹 Code Quality

```bash
# Run ESLint
npm run lint

# Fix auto-fixable ESLint issues
npm run lint -- --fix

# Type checking
npx tsc --noEmit
```

---

## 🔐 Admin Access

After seeding the database, use these credentials:

```
URL: http://localhost:3000/admin/login
Email: admin@brightlinkschool.edu.pk
Password: Admin@123
```

---

## 🌍 Environment Variables

Create `.env` file in root directory:

```bash
# Database (Required)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Cloudinary (Required for file uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# App URL (Optional)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚢 Deployment (Vercel)

### Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Via GitHub (Recommended)

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables
4. Deploy automatically on every push

### Post-Deployment

```bash
# Update environment variable
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"

# Redeploy to apply changes
```

---

## 🐛 Troubleshooting

### Clear Next.js Cache

```bash
# Remove build artifacts
rm -rf .next

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues

```bash
# Test database connection
npx prisma db pull

# Check Prisma Client status
npx prisma validate

# Regenerate Prisma Client
npx prisma generate
```

### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill
```

---

## 📊 Useful Commands

### Check Package Versions

```bash
# Check Next.js version
npm list next

# Check all outdated packages
npm outdated

# Update packages
npm update
```

### View Build Output

```bash
# Analyze bundle size
npm run build

# Check for unused dependencies
npx depcheck
```

### Database Inspection

```bash
# View database schema
npx prisma db pull

# Format Prisma schema
npx prisma format

# Validate Prisma schema
npx prisma validate
```

---

## 🔄 Complete Fresh Start

If you need to completely reset the project:

```bash
# 1. Clean everything
rm -rf .next node_modules package-lock.json

# 2. Reinstall dependencies
npm install

# 3. Generate Prisma Client
npm run db:generate

# 4. Push schema to database
npm run db:push

# 5. Seed database
npm run db:seed

# 6. Start development server
npm run dev
```

---

## 📝 Quick Workflow

### Daily Development

```bash
# 1. Pull latest changes
git pull

# 2. Install any new dependencies
npm install

# 3. Start dev server
npm run dev
```

### Before Committing

```bash
# 1. Lint code
npm run lint

# 2. Test production build
npm run build

# 3. Commit if successful
git add .
git commit -m "Your message"
git push
```

### After Schema Changes

```bash
# 1. Update Prisma schema
# Edit: prisma/schema.prisma

# 2. Generate Prisma Client
npm run db:generate

# 3. Push to database
npm run db:push

# 4. Update seed if needed
# Edit: prisma/seed.ts

# 5. Reseed database
npm run db:seed
```

---

## 🎯 Common Tasks

### Add New Admin User (via Prisma Studio)

```bash
# 1. Open Prisma Studio
npm run db:studio

# 2. Navigate to 'Admin' model
# 3. Click "Add record"
# 4. Fill in details (password must be bcrypt hashed)
```

### View All Data

```bash
# Open Prisma Studio to view/edit all data
npm run db:studio
```

### Export Database

```bash
# Using Prisma
npx prisma db pull

# Using pg_dump (if you have PostgreSQL installed)
pg_dump DATABASE_URL > backup.sql
```

---

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated**: September 2026
