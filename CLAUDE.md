# Bright Link School Website - Project Instructions

## Project Overview

This project already has a well-designed frontend built with Next.js, TypeScript, and Tailwind CSS.

The current website includes most public pages and a professional UI.

**Do NOT redesign the website.**

The objective is to convert the existing static website into a dynamic, database-driven application while preserving the current design.

---

# Important Rules

## Do NOT

- Do not redesign the UI.
- Do not recreate existing pages.
- Do not change the existing color palette.
- Do not change typography.
- Do not change spacing.
- Do not remove animations.
- Do not replace the overall design.
- Do not create the Admin Dashboard in this phase.
- Do not create a Student Portal.
- Do not use mock data.
- Do not hardcode data inside components.

---

## Preserve

Keep everything that already exists unless it conflicts with these instructions.

Keep

- Layout
- Components
- Navbar
- Footer
- Hero
- Responsive Design
- Animations
- Existing UI
- Existing UX

Only improve functionality.

---

# Existing Pages

Reuse the existing pages.

- Home
- About
- Academics
- Facilities
- Faculty
- Gallery
- Events
- Contact
- Feedback

Do not duplicate these pages.

---

# Remove

Completely remove

Student Portal

Remove

- Route
- Components
- Navigation Link
- Mock Data

Student Portal is not required.

---

# Tech Stack

Use

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- React Hook Form
- Zod
- Server Actions or API Routes (whichever fits the project architecture)

---

# Database

Use PostgreSQL.

Design a scalable database that will later be connected with an Admin Dashboard.

Create proper Prisma models.

Do not use local JSON or mock arrays.

---

# Dynamic Content

Replace all hardcoded content with PostgreSQL wherever appropriate.

The following modules must become dynamic.

---

## Admissions

Create a complete Admission page.

Current project does not have a real admission system.

Create

Admission Information

Eligibility

Required Documents

Admission Procedure

Admission Form

Form Fields

Student

- Full Name
- Father Name
- Gender
- Date of Birth
- B-Form Number
- Previous School

Parent

- Parent Name
- Phone
- WhatsApp
- Email

Address

- City
- Area
- Complete Address

Admission

- Applying Class
- Session
- Admission Date

Uploads

- Student Photo
- Birth Certificate

Use

React Hook Form

+

Zod

On submit

Store everything inside PostgreSQL.

Show success message.

---

# Gallery

Current gallery uses static images.

Remove static data.

Gallery must fetch images from PostgreSQL.

Each image contains

- Title
- Description
- Category
- Image URL
- Upload Date

No hardcoded gallery arrays.

---

# Faculty

Replace hardcoded teachers.

Fetch teachers from PostgreSQL.

Each teacher

- Photo
- Name
- Subject
- Qualification
- Experience

Keep existing cards and design.

---

# Events

Replace static events.

Fetch all events from PostgreSQL.

Keep existing UI.

---

# Contact

Keep current Contact page.

Connect Contact Form with PostgreSQL.

Store

- Name
- Email
- Phone
- Subject
- Message

Display proper validation and success messages.

---

# Feedback

Keep the existing Feedback page.

Replace client-side storage.

Store all feedback inside PostgreSQL.

Feedback fields

- Name
- Email
- Student Class
- Rating
- Comment

---

# Home Page

Do not redesign.

Only make dynamic sections where necessary.

Examples

Latest Events

Latest Gallery Images

Testimonials

These should come from PostgreSQL.

---

# Image Storage

Do NOT store image files inside PostgreSQL.

Use Cloudinary for image uploads.

Store only image URLs inside PostgreSQL.

This applies to

- Gallery Images
- Teacher Photos
- Student Photos
- News Thumbnails

---

# API

Create clean API architecture.

Organize routes properly.

Follow RESTful conventions or Server Actions consistently.

Use proper validation.

Return proper status codes.

---

# Folder Structure

Clean the project structure.

There are duplicate component folders.

Consolidate reusable components into one components directory.

Remove unnecessary duplicate folders.

Keep the architecture scalable.

---

# Code Quality

Use

- TypeScript
- Reusable Components
- Clean Architecture
- Proper Interfaces
- Utility Functions
- Custom Hooks where needed

Avoid duplicated code.

---

# Validation

Use

React Hook Form

+

Zod

Every form must have

- Required validation
- Error messages
- Success state

---

# Performance

Optimize the application.

Use

- Next.js Image
- Lazy Loading
- Server Components
- Dynamic Imports where useful

Avoid unnecessary Client Components.

---

# SEO

Maintain SEO.

Each page should have

- Title
- Description
- Open Graph Metadata

Use semantic HTML.

---

# Accessibility

Maintain accessibility.

Use

- Proper labels
- ARIA attributes
- Keyboard navigation

---

# PostgreSQL Tables

Create schemas for

## admissions

- id
- student_name
- father_name
- gender
- dob
- b_form_number
- previous_school
- parent_name
- phone
- whatsapp
- email
- city
- area
- address
- applying_class
- session
- admission_date
- student_photo_url
- birth_certificate_url
- created_at

---

## gallery

- id
- title
- description
- category
- image_url
- created_at

---

## teachers

- id
- name
- subject
- qualification
- experience
- photo_url

---

## events

- id
- title
- description
- thumbnail_url
- event_date
- created_at

---

## feedback

- id
- name
- email
- student_class
- rating
- comment
- created_at

---

## contact_messages

- id
- name
- email
- phone
- subject
- message
- created_at

---

# Future Admin Dashboard

Do NOT build the Admin Dashboard now.

However,

Design the backend so it can later support complete CRUD functionality.

Future Admin Dashboard will manage

- Admissions
- Gallery
- Teachers
- Events
- Feedback
- Contact Messages
- School Settings

Backend architecture should already support these operations.

---

# Final Goal

The final result should be a production-ready school website.

The UI should remain exactly as it is today.

Only replace static content with PostgreSQL-backed dynamic data.

The project should be clean, scalable, maintainable, and fully prepared for the future Admin Dashboard without requiring major backend changes.