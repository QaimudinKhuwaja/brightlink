# 🚀 SETUP INSTRUCTIONS

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database set up
- Cloudinary account created

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database

Create a PostgreSQL database:
```sql
CREATE DATABASE brightlink_school;
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env` with your credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/brightlink_school?schema=public"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Getting Cloudinary Credentials:**
1. Sign up at https://cloudinary.com
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

### 4. Initialize Database

Generate Prisma Client:
```bash
npx prisma generate
```

Push schema to database:
```bash
npx prisma db push
```

### 5. Seed Database (Optional but Recommended)

Add seed script to `package.json`:
```json
"scripts": {
  ...
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

Install ts-node (if not installed):
```bash
npm install -D ts-node
```

Run seed:
```bash
npm run seed
```

This will add:
- 6 Faculty members
- 6 Events
- 4 Sample testimonials
- School settings

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 🎯 Testing the Application

### Test Admission Form
1. Go to http://localhost:3000/admission
2. Fill out the form
3. Upload student photo and birth certificate
4. Submit
5. Check Prisma Studio to verify: `npx prisma studio`

### Test Feedback System
1. Go to http://localhost:3000/feedback
2. Submit feedback
3. Verify in Prisma Studio
4. Note: Feedback needs admin approval to be published

### Test Contact Form
1. Go to http://localhost:3000/contact
2. Fill and submit
3. Check messages in Prisma Studio

### View Dynamic Content
- Faculty: http://localhost:3000/faculty
- Events: http://localhost:3000/events
- Gallery: http://localhost:3000/gallery (will be empty until images are added)

## 📊 Managing Content

### Using Prisma Studio (Recommended for Development)

```bash
npx prisma studio
```

This opens a GUI at http://localhost:5555 where you can:
- View all data
- Add/edit/delete records
- Approve feedback
- Manage all content

### Adding Gallery Images

1. Open Prisma Studio
2. Go to GalleryImage model
3. Click "Add record"
4. Fill in:
   - title: "Image Title"
   - description: "Image description"
   - category: "Events" (or any category)
   - imageUrl: "https://your-cloudinary-url.jpg"
   - isActive: true

**Note:** For production, you'll need an Admin Dashboard to manage content.

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db pull
```

### Prisma Schema Changes
```bash
# After modifying schema.prisma
npx prisma generate
npx prisma db push
```

### Clear Database (Caution!)
```bash
npx prisma db push --force-reset
npm run seed  # Re-seed after reset
```

### File Upload Issues
- Verify Cloudinary credentials are correct
- Check file size (max 5MB)
- Ensure internet connection for Cloudinary uploads

## 📦 Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Environment Variables in Vercel

Add all variables from `.env`:
- DATABASE_URL
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- NEXT_PUBLIC_APP_URL (set to your Vercel domain)

### Other Platforms

Similar process - ensure:
- PostgreSQL database is accessible
- Environment variables are set
- Node.js 18+ is available

## ✅ Checklist

- [ ] PostgreSQL installed and database created
- [ ] Cloudinary account created
- [ ] Environment variables configured
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma generated (`npx prisma generate`)
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Database seeded (`npm run seed`)
- [ ] Development server running (`npm run dev`)
- [ ] Tested admission form
- [ ] Tested feedback form
- [ ] Tested contact form
- [ ] Verified dynamic content displays

## 🎓 Next Steps

1. **Add Gallery Images** via Prisma Studio
2. **Customize School Settings** in database
3. **Review and Approve Feedback** submissions
4. **Test All Forms** thoroughly
5. **Plan Admin Dashboard** for future content management

## 📞 Need Help?

Check:
- Prisma documentation: https://www.prisma.io/docs
- Next.js documentation: https://nextjs.org/docs
- Cloudinary documentation: https://cloudinary.com/documentation

Happy coding! 🚀
