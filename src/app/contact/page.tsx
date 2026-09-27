'use client';

import { useState } from 'react';
import MotionDiv from '@/app/components/ui/MotionDiv';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Facebook, Youtube } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations/contact';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { Alert } from '@/components/ui/Alert';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setAlert({ type: 'error', message: result.message || 'Failed to send message' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone & WhatsApp',
      content: '+92 300 0811056',
      link: 'tel:+923000811056',
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-500/10 dark:bg-green-500/20',
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: 'info@brightlinkschool.edu.pk',
      link: 'mailto:info@brightlinkschool.edu.pk',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    },
    {
      icon: MapPin,
      title: 'School Address',
      content: 'Khuhra, Tehsil Gambat, Khairpur, Sindh',
      link: null,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-500/10 dark:bg-red-500/20',
    },
    {
      icon: Clock,
      title: 'School Hours',
      content: 'Monday - Friday: 8:00 AM - 2:00 PM',
      link: null,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-blue-600 to-cyan-700 dark:from-blue-700 dark:to-cyan-800 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="glow-blob-blue w-96 h-96 -top-48 -right-48 opacity-30" />
        <div className="glow-blob-blue w-80 h-80 bottom-0 left-20 opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="italic">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Have questions? We&apos;re here to help. Reach out and we&apos;ll respond as soon as possible.
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="section-padding bg-background-secondary relative overflow-hidden">
        <div className="glow-blob-blue w-96 h-96 top-20 -left-48" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="saas-card p-6 text-center"
              >
                <div className={`w-14 h-14 ${info.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`w-7 h-7 ${info.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-sm text-foreground-secondary hover:text-accent-blue transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sm text-foreground-secondary">{info.content}</p>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="glow-blob-blue w-80 h-80 bottom-20 right-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="section-heading">
                Send Us a <span className="heading-emphasis">Message</span>
              </h2>
              <p className="section-subheading">
                Fill out the form below and we&apos;ll get back to you shortly
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="saas-card p-8"
            >
              {alert && (
                <div className="mb-6">
                  <Alert type={alert.type} message={alert.message} />
                </div>
              )}

              {isSubmitted && (
                <div className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Message Sent Successfully!</h3>
                    <p className="text-sm text-foreground-secondary">
                      Thank you for contacting us. We&apos;ll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="John Doe"
                  />

                  <FormInput
                    label="Email Address"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Phone Number"
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder="+92 300 1234567"
                  />

                  <FormInput
                    label="Subject"
                    {...register('subject')}
                    error={errors.subject?.message}
                    placeholder="Admission Inquiry"
                  />
                </div>

                <FormTextarea
                  label="Your Message"
                  {...register('message')}
                  error={errors.message?.message}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Connect With Us on <span className="heading-emphasis">Social Media</span>
            </h2>
            <p className="text-foreground-secondary mb-8">
              Follow us for updates, news, and highlights from our school community
            </p>

            <div className="flex justify-center gap-4">
          
              <a
                href="https://youtube.com/@brightlinkpublichighschool"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30 rounded-pill flex items-center justify-center text-red-600 dark:text-red-400 transition-all hover:scale-110"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
