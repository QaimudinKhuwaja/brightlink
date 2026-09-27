# Bright Link School - Project Documentation

## Project Overview

**Bright Link School** is a full-stack school website and management system for Bright Link Public High School in Khuhra, Tehsil Gambat, District Khairpur, Sindh, Pakistan.

This is a dynamic, database-driven application with a public-facing website and an admin dashboard for managing all school content and operations.

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Next.js API Routes** (RESTful architecture)
- **PostgreSQL** database
- **Prisma ORM** for database access
- **bcryptjs** for password hashing

### File Management
- **Cloudinary** for image uploads and storage
- **next-cloudinary** for Next.js integration

### Form Handling & Validation
- **React Hook Form** for form state management
- **Zod** for schema validation

---

## Project Structure

```
brightlink/
├── prisma/
│   ├── schema.prisma          # Database schema (8 models)
│   └── seed.ts                # Database seeding script
│
├── public/                    # Static assets (images, favicon)
│
├── src/
│   ├── app/
│   │   ├── (public routes)
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── about/         # About page
│   │   │   ├── academics/     # Academics page
│   │   │   ├── admission/     # Admission form page
│   │   │   ├── contact/       # Contact form page
│   │   │   ├── events/        # Events listing
│   │   │   ├── facilities/    # Facilities page
│   │   │   ├── faculty/       # Faculty listing
│   │   │   ├── feedback/      # Feedback form & testimonials
│   │   │   ├── gallery/       # Gallery (dynamic from DB)
│   │   │   ├── faq/           # FAQ page
│   │   │   ├── privacy/       # Privacy policy
│   │   │   └── terms/         # Terms & conditions
│   │   │
│   │   ├── admin/
│   │   │   ├── login/         # Admin login page
│   │   │   └── (dashboard)/   # Protected admin routes
│   │   │       ├── layout.tsx # Dashboard layout with sidebar
│   │   │       ├── dashboard/ # Analytics & stats
│   │   │       ├── admissions/# Manage admissions
│   │   │       ├── gallery/   # Manage gallery images
│   │   │       ├── faculty/   # Manage teachers
│   │   │       ├── events/    # Manage events
│   │   │       ├── feedback/  # Manage feedback
│   │   │       ├── messages/  # View contact messages
│   │   │       ├── settings/  # School settings
│   │   │       └── admins/    # Manage admin users
│   │   │
│   │   ├── api/               # API Routes
│   │   │   ├── (public endpoints)
│   │   │   │   ├── admissions/    # POST new admissions
│   │   │   │   ├── contact/       # POST contact messages
│   │   │   │   ├── events/        # GET events
│   │   │   │   ├── faculty/       # GET faculty
│   │   │   │   ├── feedback/      # GET/POST feedback
│   │   │   │   ├── gallery/       # GET gallery images
│   │   │   │   └── upload/        # POST file uploads (Cloudinary)
│   │   │   │
│   │   │   └── admin/         # Protected admin endpoints
│   │   │       ├── auth/          # Login, logout, session check
│   │   │       ├── admissions/    # CRUD admissions
│   │   │       ├── gallery/       # CRUD gallery
│   │   │       ├── faculty/       # CRUD faculty
│   │   │       ├── events/        # CRUD events
│   │   │       ├── feedback/      # CRUD feedback
│   │   │       ├── messages/      # Read/delete contact messages
│   │   │       ├── settings/      # Update school settings
│   │   │       ├── admins/        # Manage admin users
│   │   │       └── dashboard/     # Analytics stats
│   │   │
│   │   ├── component/         # Legacy layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── SmallNavbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── MotionDivWrapper.tsx
│   │   │
│   │   ├── components/        # Reusable UI components
│   │   │   └── ui/            # Form components
│   │   │       ├── Badge.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Select.tsx
│   │   │       ├── Textarea.tsx
│   │   │       └── MotionDiv.tsx
│   │   │
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Shared components
│   │   ├── admin/             # Admin-specific components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── Skeletons.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   └── ui/                # Form components for public pages
│   │       ├── Alert.tsx
│   │       ├── FileUpload.tsx
│   │       ├── FormInput.tsx
│   │       ├── FormSelect.tsx
│   │       └── FormTextarea.tsx
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── cloudinary.ts      # Cloudinary configuration
│   │   ├── auth.ts            # Authentication utilities
│   │   ├── utils.ts           # Helper functions
│   │   │
│   │   └── validations/       # Zod schemas
│   │       ├── admission.ts
│   │       ├── contact.ts
│   │       ├── feedback.ts
│   │       └── admin.ts
│   │
│   └── middleware.ts          # Route protection middleware
│
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment template
├── package.json               # Dependencies and scripts
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── CLAUDE.md                  # AI agent instructions
├── QUICKSTART.md              # Quick setup guide
├── SETUP.md                   # Detailed setup guide
└── README.md                  # Project overview
```

---

## Database Schema

### Models (8 total)

1. **Admission** - Student admission applications
   - Student info, parent details, address, documents
   - Status: PENDING, APPROVED, REJECTED

2. **GalleryImage** - School gallery photos
   - Title, description, category, image URL
   - Active/inactive flag

3. **Faculty** - Teachers and staff
   - Name, role, qualification, experience
   - Photo, emoji, bio, display order

4. **Event** - School events and activities
   - Title, description, date, category
   - Color coding, icon, image

5. **ContactMessage** - Contact form submissions
   - Name, email, phone, subject, message
   - Read/unread status

6. **Feedback** - Parent/student feedback
   - Name, email, child class, rating, comment
   - Approval workflow (isApproved, isPublished)

7. **SchoolSettings** - School information
   - Contact details, social media links
   - Stats (students, teachers, success rate)
   - Admission status, current session

8. **Admin** - Admin user accounts
   - Username, email, hashed password
   - Role: SUPER_ADMIN or ADMIN
   - Active/inactive status

### Relationships
- All models use `cuid()` for IDs
- Timestamps: `createdAt`, `updatedAt` where applicable
- Indexed fields for query performance

---

## Frontend Pages & Routes

### Public Pages
| Route | Purpose | Data Source |
|-------|---------|-------------|
| `/` | Homepage with hero, stats, latest content | Mixed (static + dynamic) |
| `/about` | School information, mission, vision | Static content |
| `/academics` | Academic programs information | Static content |
| `/admission` | Admission form with file uploads | Form → Database |
| `/contact` | Contact form | Form → Database |
| `/events` | Event listings | Database (Event) |
| `/facilities` | School facilities | Static content |
| `/faculty` | Teachers listing | Database (Faculty) |
| `/feedback` | Feedback form + testimonials | Database (Feedback) |
| `/gallery` | Photo gallery | Database (GalleryImage) |
| `/faq` | Frequently asked questions | Static content |
| `/privacy` | Privacy policy | Static content |
| `/terms` | Terms and conditions | Static content |

### Admin Pages (Protected)
| Route | Purpose | Access |
|-------|---------|--------|
| `/admin/login` | Admin login page | Public |
| `/admin/dashboard` | Overview, stats, quick actions | Authenticated |
| `/admin/admissions` | Manage admission applications | Authenticated |
| `/admin/gallery` | Manage gallery images | Authenticated |
| `/admin/faculty` | Manage teachers | Authenticated |
| `/admin/events` | Manage events | Authenticated |
| `/admin/feedback` | Approve/manage feedback | Authenticated |
| `/admin/messages` | View contact messages | Authenticated |
| `/admin/settings` | Update school settings | Authenticated |
| `/admin/admins` | Manage admin users | SUPER_ADMIN only |

---

## API Routes

### Public Endpoints

**POST /api/admissions**
- Submit admission application
- Validates data with Zod schema
- Uploads files to Cloudinary
- Stores in database

**POST /api/contact**
- Submit contact form
- Validates email, phone, message
- Stores in ContactMessage table

**POST /api/feedback**
- Submit feedback/testimonial
- Stores with isApproved=false (requires admin approval)

**GET /api/feedback**
- Get published feedback (isPublished=true)
- Used for testimonials display

**GET /api/events**
- Get active events (isActive=true)
- Sorted by date

**GET /api/faculty**
- Get active faculty (isActive=true)
- Sorted by order field

**GET /api/gallery**
- Get active gallery images (isActive=true)
- Optional category filter
- Sorted by upload date

**POST /api/upload**
- Upload files to Cloudinary
- Returns secure URL
- Used by forms (admission, admin)

### Admin Endpoints (Protected)

All `/api/admin/*` routes require authentication via middleware.

**Auth**
- POST /api/admin/auth/login - Login with email/password
- POST /api/admin/auth/logout - Clear session
- GET /api/admin/auth/me - Get current user session

**CRUD Operations**
- /api/admin/admissions - GET (list), POST (create), PUT (update), DELETE
- /api/admin/gallery - GET (list), POST (create), PUT (update), DELETE
- /api/admin/faculty - GET (list), POST (create), PUT (update), DELETE
- /api/admin/events - GET (list), POST (create), PUT (update), DELETE
- /api/admin/feedback - GET (list), PUT (approve/publish), DELETE
- /api/admin/messages - GET (list), PUT (mark read), DELETE
- /api/admin/settings - GET, PUT (update school settings)
- /api/admin/admins - GET (list), POST (create), PUT (update), DELETE

**Dashboard**
- GET /api/admin/dashboard/stats - Get overview statistics

---

## Data Flow Examples

### Public Form Submission (Admission)
```
User fills form
    ↓
React Hook Form + Zod validation (client-side)
    ↓
Upload files to Cloudinary (student photo, birth certificate)
    ↓
POST /api/admissions with form data + Cloudinary URLs
    ↓
Server validates with Zod schema
    ↓
Prisma stores in Admission table with status=PENDING
    ↓
Success message shown to user
```

### Admin Reviews Admission
```
Admin logs in at /admin/login
    ↓
POST /api/admin/auth/login (creates session)
    ↓
Middleware protects /admin/* routes
    ↓
Admin navigates to /admin/admissions
    ↓
GET /api/admin/admissions (fetches all admissions)
    ↓
Admin reviews application, clicks Approve
    ↓
PUT /api/admin/admissions with status=APPROVED
    ↓
Database updated via Prisma
```

### Dynamic Content Display (Gallery)
```
User visits /gallery page
    ↓
useEffect calls GET /api/gallery
    ↓
Server queries: prisma.galleryImage.findMany({ where: { isActive: true } })
    ↓
Returns array of gallery images with Cloudinary URLs
    ↓
Frontend renders image grid with lightbox
```

### Admin Manages Gallery
```
Admin logged in at /admin/gallery
    ↓
GET /api/admin/gallery (fetches all images, including inactive)
    ↓
Admin clicks "Add Image"
    ↓
Upload image file → POST /api/upload → Cloudinary URL returned
    ↓
POST /api/admin/gallery with title, category, imageUrl
    ↓
Prisma creates GalleryImage record
    ↓
Image appears on public gallery page
```

---

## Authentication & Authorization

### Session-Based Auth
- Admin logs in with email/password
- bcryptjs validates password hash
- Session cookie created (httpOnly, secure in production)
- middleware.ts checks session for `/admin/*` routes
- Session data stored server-side

### Password Security
- Passwords hashed with bcryptjs (salt rounds: 12)
- Never stored in plain text
- Default admin: `admin@brightlinkschool.edu.pk` / `Admin@123`

### Role-Based Access
- **SUPER_ADMIN**: Full access including admin management
- **ADMIN**: Access to content management, no admin user management

### Middleware Protection
```typescript
// src/middleware.ts
// Redirects unauthenticated users trying to access /admin/dashboard/* to /admin/login
// Allows public access to /admin/login
```

---

## Environment Variables

Required in `.env` file (see `.env.example`):

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/brightlink_school"

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Never commit `.env` to git.** It contains secrets.

---

## How to Run

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- Cloudinary account (free tier works)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your database and Cloudinary credentials

# 3. Set up database
npx prisma generate        # Generate Prisma client
npx prisma db push         # Create database tables
npm run db:seed            # Seed with sample data

# 4. Run development server
npm run dev

# Visit http://localhost:3000
```

### Build for Production

```bash
npm run build              # Build optimized production bundle
npm start                  # Start production server
```

### Database Management

```bash
npm run db:studio          # Open Prisma Studio (database GUI)
npm run db:generate        # Regenerate Prisma client
npm run db:push            # Push schema changes to database
```

---

## Important Rules for AI Agents

When working on this project, **DO NOT**:

1. **Change the UI/UX design** - The design is final and approved
2. **Change colors, fonts, spacing** - Keep existing Tailwind classes
3. **Remove animations** - Framer Motion animations must stay
4. **Hardcode data** - Everything dynamic must come from database
5. **Create duplicate components** - Check existing components first
6. **Bypass validation** - All forms must use React Hook Form + Zod
7. **Store images in database** - Use Cloudinary URLs only
8. **Commit secrets** - Never commit `.env` or expose credentials
9. **Break existing routes** - Test navigation after changes
10. **Remove the admin dashboard** - It's a core feature

**ALWAYS**:

1. **Check existing code first** - Avoid reinventing components
2. **Use TypeScript** - Maintain type safety throughout
3. **Follow project structure** - Keep files organized
4. **Validate user input** - Both client and server side
5. **Handle errors gracefully** - Show user-friendly messages
6. **Test forms thoroughly** - Ensure data reaches database
7. **Maintain accessibility** - Use semantic HTML, ARIA labels
8. **Keep components reusable** - DRY principle
9. **Use Prisma for database** - Never write raw SQL
10. **Document major changes** - Update this file if architecture changes

---

## Key Workflows

### Adding New Content Type

1. Add model to `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Create API routes: `/api/{content}` (public) and `/api/admin/{content}` (admin)
4. Create Zod validation schema in `src/lib/validations/`
5. Create frontend page in `src/app/{content}/`
6. Create admin page in `src/app/admin/(dashboard)/{content}/`
7. Add navigation links to Navbar and Sidebar
8. Test CRUD operations
9. Update seed script if needed

### Modifying Database Schema

1. Edit `prisma/schema.prisma`
2. Run `npx prisma db push` (development) or create migration (production)
3. Update affected API routes
4. Update TypeScript types (Prisma generates these)
5. Update frontend components using the data
6. Test thoroughly

### Adding New Admin User

Option 1: Via Admin Dashboard (if SUPER_ADMIN logged in)
- Go to `/admin/admins`
- Click "Add Admin"
- Fill form and submit

Option 2: Via Prisma Studio
```bash
npm run db:studio
# Navigate to Admin table
# Add new record with hashed password
```

Option 3: Via Seed Script
- Edit `prisma/seed.ts`
- Add admin user object
- Run `npm run db:seed`

---

## Troubleshooting

### Database Connection Failed
- Check PostgreSQL is running: `pg_ctl status`
- Verify DATABASE_URL in `.env`
- Test connection: `npx prisma db pull`

### Cloudinary Upload Failed
- Verify Cloudinary credentials in `.env`
- Check API key has upload permissions
- Ensure file size < 10MB

### Admin Login Not Working
- Check admin exists: `npm run db:studio`
- Verify password is hashed (not plain text)
- Clear browser cookies and try again
- Check middleware.ts is working

### Images Not Displaying
- Check Cloudinary URLs are valid
- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
- Check image isActive=true in database

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

---

## Deployment Considerations

### Environment Setup
- Use production PostgreSQL (e.g., Railway, Supabase, Neon)
- Set `NODE_ENV=production`
- Use secure session secrets
- Enable HTTPS

### Database
- Run migrations instead of `prisma db push`
- Seed production database carefully
- Set up automated backups
- Use connection pooling for scaling

### Security
- Change default admin password immediately
- Use strong session secrets
- Enable CORS protection
- Set up rate limiting for API routes
- Use HTTPS only
- Secure cookies (httpOnly, secure, sameSite)

### Performance
- Enable Next.js image optimization
- Use CDN for static assets
- Enable gzip compression
- Set up database indexes (already in schema)
- Monitor API response times

---

## Project Status

✅ **Complete & Production Ready**

- All public pages functional
- Full admin dashboard with CRUD operations
- Database schema designed and tested
- Authentication & authorization working
- File uploads via Cloudinary operational
- Form validation implemented
- Responsive design across devices
- SEO-friendly pages
- Accessibility compliant

---

## Support & Resources

- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **Cloudinary**: https://cloudinary.com/documentation
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev

---

**Last Updated**: Project cleanup completed
**Version**: 1.0.0
**Maintained By**: Development Team
