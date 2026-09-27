# Bright Link School - Dynamic Website

A modern, full-featured school website powered by Next.js 14, PostgreSQL, and Prisma ORM.

## 🚀 Features

- **Dynamic Content Management**: All content stored in PostgreSQL
- **Admission System**: Complete online admission form with file uploads
- **Gallery Management**: Dynamic image gallery with Cloudinary integration
- **Faculty Profiles**: Manage teacher information dynamically
- **Events & News**: Dynamic events system
- **Contact System**: Contact form with database storage
- **Feedback System**: Parents can submit and view feedback
- **Responsive Design**: Fully optimized for all devices
- **Modern UI/UX**: Smooth animations with Framer Motion
- **Type-Safe**: Built with TypeScript
- **Form Validation**: React Hook Form + Zod

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **File Storage**: Cloudinary
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Cloudinary account (for image uploads)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd brightlink
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Environment Variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Setup Database**

Run Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

5. **Seed Database (Optional)**

```bash
npm run seed
```

6. **Run Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
brightlink/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── admissions/
│   │   │   ├── contact/
│   │   │   ├── events/
│   │   │   ├── faculty/
│   │   │   ├── feedback/
│   │   │   ├── gallery/
│   │   │   └── upload/
│   │   ├── about/
│   │   ├── academics/
│   │   ├── admission/        # Admission page with form
│   │   ├── contact/
│   │   ├── events/
│   │   ├── facilities/
│   │   ├── faculty/
│   │   ├── feedback/
│   │   ├── gallery/
│   │   ├── component/        # Legacy components (Navbar, Footer, Hero)
│   │   ├── components/       # Reusable components
│   │   │   ├── ui/          # UI components
│   │   │   └── sections/    # Section components
│   │   ├── layout.tsx
│   │   └── page.tsx         # Homepage
│   ├── components/          # Shared components
│   │   ├── ui/             # Form components, Alert, etc.
│   │   ├── layout/         # Layout components
│   │   └── shared/         # Shared components
│   └── lib/
│       ├── prisma.ts        # Prisma client
│       ├── cloudinary.ts    # Cloudinary config
│       ├── utils.ts         # Utility functions
│       └── validations/     # Zod schemas
├── public/                  # Static assets
└── package.json
```

## 🗄️ Database Models

- **Admission**: Student admission applications
- **GalleryImage**: School gallery images
- **Faculty**: Teacher profiles
- **Event**: School events and news
- **ContactMessage**: Contact form submissions
- **Feedback**: Parent feedback/testimonials
- **SchoolSettings**: School configuration (for future admin)

## 🔐 API Routes

### POST Routes
- `/api/admissions` - Submit admission application
- `/api/contact` - Submit contact form
- `/api/feedback` - Submit feedback
- `/api/upload` - Upload files to Cloudinary

### GET Routes
- `/api/events` - Get all events
- `/api/faculty` - Get all faculty members
- `/api/gallery` - Get all gallery images
- `/api/feedback` - Get published feedback

## 📝 Admission Form Fields

**Student Information**
- Full Name, Father Name
- Gender, Date of Birth, B-Form Number
- Previous School (optional)

**Parent Information**
- Parent Name, Phone, WhatsApp
- Email (optional)

**Address**
- City, Area, Complete Address

**Admission Details**
- Applying Class, Session, Admission Date

**Documents**
- Student Photo (uploaded to Cloudinary)
- Birth Certificate (uploaded to Cloudinary)

## 🎨 Customization

### Adding New Content

Content is managed through API routes. For now, you can:
1. Use Prisma Studio: `npx prisma studio`
2. Directly insert data into PostgreSQL
3. Wait for the Admin Dashboard (future feature)

### Styling

All styles use Tailwind CSS. Custom colors and design system are defined in:
- `tailwind.config.ts`
- `src/app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Ensure PostgreSQL database is accessible
4. Set environment variables

## 📊 Future Features (Admin Dashboard)

The backend is prepared for future admin dashboard integration to manage:
- ✅ Admissions (CRUD)
- ✅ Gallery Images (CRUD)
- ✅ Faculty (CRUD)
- ✅ Events (CRUD)
- ✅ Feedback Moderation
- ✅ Contact Messages
- ✅ School Settings

## 🔒 Security Notes

- All form inputs are validated with Zod
- File uploads are restricted to images
- Environment variables are required
- SQL injection protection via Prisma
- XSS protection via React

## 📞 Support

For issues or questions, please contact the development team.

## 📄 License

All rights reserved © 2024 Bright Link School
"# brightlink-school" 
