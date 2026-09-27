import { z } from 'zod';

// Base schema for form validation (without file URLs)
export const admissionSchema = z.object({
  // Student Information
  studentName: z.string().min(3, 'Student name must be at least 3 characters').max(100),
  fatherName: z.string().min(3, 'Father name must be at least 3 characters').max(100),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    required_error: 'Please select gender',
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  bFormNumber: z.string().min(13, 'B-Form number must be 13 digits').max(13),
  previousSchool: z.string().optional(),

  // Parent Information
  parentName: z.string().min(3, 'Parent name must be at least 3 characters').max(100),
  phone: z.string().min(11, 'Phone number must be at least 11 digits').max(15),
  whatsapp: z.string().min(11, 'WhatsApp number must be at least 11 digits').max(15),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),

  // Address
  city: z.string().min(2, 'City is required').max(100),
  area: z.string().min(2, 'Area is required').max(100),
  completeAddress: z.string().min(10, 'Complete address is required').max(500),

  // Admission Details
  applyingClass: z.string().min(1, 'Please select a class'),
  session: z.string().min(1, 'Please select session'),
  admissionDate: z.string().min(1, 'Admission date is required'),
});

// Extended schema for API validation (includes file URLs)
export const admissionApiSchema = admissionSchema.extend({
  studentPhotoUrl: z.string().url('Invalid photo URL'),
  birthCertificateUrl: z.string().url('Invalid certificate URL'),
});

export type AdmissionFormData = z.infer<typeof admissionSchema>;
export type AdmissionApiData = z.infer<typeof admissionApiSchema>;
