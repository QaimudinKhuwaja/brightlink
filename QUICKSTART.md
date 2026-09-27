# 🚀 QUICK START GUIDE

Follow these steps to get your dynamic school website running in **15 minutes**.

## Prerequisites Check

- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL installed and running
- [ ] Cloudinary account created (free tier works)
- [ ] Git installed

---

## Step 1: Install Dependencies (2 min)

```bash
npm install
```

**Expected**: No errors, all packages installed successfully.

---

## Step 2: Create PostgreSQL Database (2 min)

### Option A: Using psql
```bash
psql -U postgres
CREATE DATABASE brightlink_school;
\q
```

### Option B: Using pgAdmin
1. Open pgAdmin
2. Right-click "Databases" → Create → Database
3. Name: `brightlink_school`
4. Click Save

**Test Connection:**
```bash
psql -U postgres -d brightlink_school -c "SELECT 1;"
```

---

## Step 3: Setup Environment Variables (3 min)

1. **Copy example file:**
```bash
cp .env.example .env
```

2. **Edit `.env` file with your credentials:**

```env
# Database (replace with your details)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/brightlink_school?schema=public"

# Cloudinary (get from https://cloudinary.com/console)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Getting Cloudinary Credentials:
1. Sign up at https://cloudinary.com (free)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret

---

## Step 4: Initialize Database (3 min)

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed
```

**Expected Output:**
```
✅ Seeding completed successfully!
```

---

## Step 5: Run Development Server (1 min)

```bash
npm run dev
```

**Expected:**
```
- Local: http://localhost:3000
- Ready in X ms
```

---

## Step 6: Verify Everything Works (4 min)

### ✅ Checklist:

Visit each page and verify:

- [ ] **Homepage** (http://localhost:3000)
  - Loads without errors
  - Shows dynamic events (if seeded)
  - Shows testimonials

- [ ] **About** (http://localhost:3000/about)
  - Static content displays

- [ ] **Academics** (http://localhost:3000/academics)
  - 12 class cards display

- [ ] **Facilities** (http://localhost:3000/facilities)
  - 6 facility cards display

- [ ] **Faculty** (http://localhost:3000/faculty)
  - Shows 6 seeded faculty members
  - Loading spinner appears briefly

- [ ] **Events** (http://localhost:3000/events)
  - Shows 6 seeded events
  - Categories display correctly

- [ ] **Gallery** (http://localhost:3000/gallery)
  - Page loads (will be empty until images added)

- [ ] **Contact** (http://localhost:3000/contact)
  - Form displays correctly
  - Social links present

- [ ] **Admission** (http://localhost:3000/admission)
  - Form loads with all sections
  - File upload areas visible

- [ ] **Feedback** (http://localhost:3000/feedback)
  - Form displays
  - 4 seeded testimonials show

### Test Forms:

1. **Contact Form Test:**
   - Fill out form
   - Submit
   - Should see success message

2. **Feedback Form Test:**
   - Fill out form
   - Select rating
   - Submit
   - Should see success message

3. **Admission Form Test (Skip file uploads for now):**
   - Can test without uploading files initially
   - Verify all fields are present

---

## Step 7: View Database (Bonus)

Open Prisma Studio to see all submitted data:

```bash
npm run db:studio
```

Opens at http://localhost:5555

You can:
- View all submissions
- Approve feedback
- Edit content
- Add gallery images manually

---

## 🎉 Success!

If all checkboxes are checked, your website is fully functional!

---

## Common Issues & Fixes

### Issue: Database connection error

**Fix:**
```bash
# Check PostgreSQL is running
sudo service postgresql status  # Linux
brew services list  # Mac

# Test connection
psql -U postgres -d brightlink_school
```

### Issue: Prisma client not generated

**Fix:**
```bash
npx prisma generate --force
```

### Issue: Port 3000 already in use

**Fix:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
npm run dev -- -p 3001
```

### Issue: Cloudinary upload fails

**Fix:**
- Verify credentials in `.env`
- Check internet connection
- Ensure file is under 5MB
- Try uploading from Cloudinary dashboard first

### Issue: Module not found errors

**Fix:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

---

## Next Steps

### Add Gallery Images

1. Open Prisma Studio: `npm run db:studio`
2. Click "GalleryImage"
3. Click "Add record"
4. Fill in:
   ```
   title: "School Building"
   description: "Our beautiful campus"
   category: "Campus"
   imageUrl: "https://your-image-url.jpg"
   isActive: true
   ```
5. Save

**Getting Image URLs:**
- Upload to Cloudinary dashboard
- Copy URL
- Paste in imageUrl field

### Approve Feedback

1. Open Prisma Studio
2. Go to "Feedback" model
3. Find submitted feedback
4. Set `isPublished: true`
5. Save
6. Now appears on website

### Customize School Settings

1. Open Prisma Studio
2. Go to "SchoolSettings"
3. Edit the single record
4. Update phone, email, social links
5. Save

---

## Ready for Production?

Once everything works locally:

1. **Push to GitHub**
```bash
git add .
git commit -m "Transform to dynamic website"
git push
```

2. **Deploy to Vercel**
   - Import project
   - Add environment variables
   - Deploy

3. **Setup Production Database**
   - Use PostgreSQL hosting (Supabase, Railway, etc.)
   - Update DATABASE_URL in Vercel

---

## Need Help?

Refer to:
- `SETUP.md` - Detailed setup guide
- `README.md` - Project documentation
- `TRANSFORMATION_SUMMARY.md` - What changed

---

**Estimated Total Time: 15 minutes** ⏱️

Good luck! 🚀
