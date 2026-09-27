# Database Connection Options

## Option 1: Reactivate Neon Database
1. Go to https://console.neon.tech
2. Log into your account
3. Find the project: ep-lively-moon-axixt94u
4. Click to wake up the database (free tier pauses after inactivity)
5. Run: npx prisma db push
6. Run: npm run db:seed

## Option 2: Create New Neon Database
1. Go to https://console.neon.tech
2. Create new project
3. Copy the connection string
4. Update DATABASE_URL in .env
5. Run: npx prisma db push
6. Run: npm run db:seed

## Option 3: Use Local PostgreSQL
1. Install PostgreSQL locally
2. Create database: createdb brightlink_school
3. Update .env:
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/brightlink_school?schema=public"
4. Run: npx prisma db push
5. Run: npm run db:seed

Currently, the website runs but cannot fetch/store dynamic data.
