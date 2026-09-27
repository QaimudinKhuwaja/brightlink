'use client';

import { useState } from 'react';
import MotionDiv from '@/app/components/ui/MotionDiv';
import { GraduationCap, FileText, Upload, CheckCircle, AlertCircle, User, Users, MapPin, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { admissionSchema, type AdmissionFormData } from '@/lib/validations/admission';
import { FormInput } from '@/components/ui/FormInput';
import { FormSelect } from '@/components/ui/FormSelect';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { FileUpload } from '@/components/ui/FileUpload';
import { Alert } from '@/components/ui/Alert';

export default function AdmissionPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [studentPhoto, setStudentPhoto] = useState<File | null>(null);
  const [birthCertificate, setBirthCertificate] = useState<File | null>(null);
  const [studentPhotoPreview, setStudentPhotoPreview] = useState<string>('');
  const [birthCertificatePreview, setBirthCertificatePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
  });

  const classes = [
    'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
  ].map((cls) => ({ value: cls, label: cls }));

  const sessions = [
    { value: '2024-25', label: '2024-25' },
    { value: '2025-26', label: '2025-26' },
    { value: '2026-27', label: '2026-27' },
  ];

  const handleStudentPhotoChange = (file: File | null) => {
    setStudentPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setStudentPhotoPreview('');
    }
  };

  const handleBirthCertificateChange = (file: File | null) => {
    setBirthCertificate(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBirthCertificatePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBirthCertificatePreview('');
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Upload failed');
    }
    return data.url;
  };

  const onSubmit = async (data: AdmissionFormData) => {
    setIsLoading(true);
    setAlert(null);

    try {
      // Validate files
      if (!studentPhoto) {
        setAlert({ type: 'error', message: 'Please upload student photo' });
        setIsLoading(false);
        return;
      }

      if (!birthCertificate) {
        setAlert({ type: 'error', message: 'Please upload birth certificate' });
        setIsLoading(false);
        return;
      }

      // Upload files to Cloudinary
      setAlert({ type: 'success', message: 'Uploading files...' });
      const [studentPhotoUrl, birthCertificateUrl] = await Promise.all([
        uploadToCloudinary(studentPhoto),
        uploadToCloudinary(birthCertificate),
      ]);

      // Submit admission form
      setAlert({ type: 'success', message: 'Submitting application...' });
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          studentPhotoUrl,
          birthCertificateUrl,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
        setStudentPhoto(null);
        setBirthCertificate(null);
        setStudentPhotoPreview('');
        setBirthCertificatePreview('');
        setAlert(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setAlert({ type: 'error', message: result.message || 'Failed to submit application' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to submit application. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="glow-blob-blue w-96 h-96 -top-48 -left-48 opacity-30" />
        <div className="glow-blob-blue w-80 h-80 bottom-0 right-20 opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block badge-pill bg-white/20 backdrop-blur-sm text-white mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Admissions Open for 2026-27</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Apply for <span className="italic">Admission</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 leading-relaxed">
              Join Bright Link School and begin your journey towards academic excellence and personal growth
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <section className="py-12 bg-background-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="saas-card p-8 text-center border-2 border-green-500/20">
                <div className="w-16 h-16 bg-green-500/10 dark:bg-green-500/20 rounded-pill flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted Successfully!</h2>
                <p className="text-foreground-secondary leading-relaxed mb-6">
                  Thank you for applying to Bright Link School. We have received your application and our admissions team will review it shortly. You will receive a confirmation email within 2-3 business days.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary px-6 py-3"
                >
                  Submit Another Application
                </button>
              </div>
            </MotionDiv>
          </div>
        </section>
      )}

      {/* Admission Form */}
      {!isSubmitted && (
        <section className="section-padding relative overflow-hidden">
          <div className="glow-blob-blue w-96 h-96 top-20 -right-48" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="section-heading">
                  Admission <span className="heading-emphasis">Application Form</span>
                </h2>
                <p className="section-subheading">
                  Please fill out all required fields accurately
                </p>
              </MotionDiv>

              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {alert && (
                  <div className="mb-6">
                    <Alert type={alert.type} message={alert.message} />
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Student Information */}
                  <div className="saas-card p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Student Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput
                        label="Student Full Name"
                        {...register('studentName')}
                        error={errors.studentName?.message}
                        placeholder="John Doe"
                      />

                      <FormInput
                        label="Father's Name"
                        {...register('fatherName')}
                        error={errors.fatherName?.message}
                        placeholder="Michael Doe"
                      />

                      <FormSelect
                        label="Gender"
                        {...register('gender')}
                        error={errors.gender?.message}
                        options={[
                          { value: 'MALE', label: 'Male' },
                          { value: 'FEMALE', label: 'Female' },
                          { value: 'OTHER', label: 'Other' },
                        ]}
                      />

                      <FormInput
                        label="Date of Birth"
                        type="date"
                        {...register('dateOfBirth')}
                        error={errors.dateOfBirth?.message}
                      />

                      <FormInput
                        label="B-Form Number"
                        {...register('bFormNumber')}
                        error={errors.bFormNumber?.message}
                        placeholder="12345-1234567-1"
                      />

                      <FormInput
                        label="Previous School (Optional)"
                        {...register('previousSchool')}
                        error={errors.previousSchool?.message}
                        placeholder="ABC School"
                      />
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div className="saas-card p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Parent/Guardian Information</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput
                        label="Parent/Guardian Name"
                        {...register('parentName')}
                        error={errors.parentName?.message}
                        placeholder="Michael Doe"
                      />

                      <FormInput
                        label="Phone Number"
                        {...register('phone')}
                        error={errors.phone?.message}
                        placeholder="+92 300 1234567"
                      />

                      <FormInput
                        label="WhatsApp Number"
                        {...register('whatsapp')}
                        error={errors.whatsapp?.message}
                        placeholder="+92 300 1234567"
                      />

                      <FormInput
                        label="Email Address (Optional)"
                        type="email"
                        {...register('email')}
                        error={errors.email?.message}
                        placeholder="parent@example.com"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="saas-card p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Address Details</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput
                        label="City"
                        {...register('city')}
                        error={errors.city?.message}
                        placeholder="Khairpur"
                      />

                      <FormInput
                        label="Area/Locality"
                        {...register('area')}
                        error={errors.area?.message}
                        placeholder="Khuhra"
                      />

                      <div className="md:col-span-2">
                        <FormTextarea
                          label="Complete Address"
                          {...register('completeAddress')}
                          error={errors.completeAddress?.message}
                          placeholder="House #, Street, Neighborhood"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Admission Details */}
                  <div className="saas-card p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Admission Details</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormSelect
                        label="Applying for Class"
                        {...register('applyingClass')}
                        error={errors.applyingClass?.message}
                        options={classes}
                      />

                      <FormSelect
                        label="Academic Session"
                        {...register('session')}
                        error={errors.session?.message}
                        options={sessions}
                      />

                      <FormInput
                        label="Admission Date"
                        type="date"
                        {...register('admissionDate')}
                        error={errors.admissionDate?.message}
                      />
                    </div>
                  </div>

                  {/* Document Uploads */}
                  <div className="saas-card p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-accent-blue/10 dark:bg-accent-blue/20 rounded-xl flex items-center justify-center">
                        <Upload className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Required Documents</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FileUpload
                        label="Student Photo"
                        accept="image/*"
                        onChange={handleStudentPhotoChange}
                        preview={studentPhotoPreview}
                        required
                      />

                      <FileUpload
                        label="Birth Certificate"
                        accept="image/*,application/pdf"
                        onChange={handleBirthCertificateChange}
                        preview={birthCertificatePreview}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary px-12 py-4 text-base flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-5 h-5" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </MotionDiv>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
