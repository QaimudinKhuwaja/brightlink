'use client';

import MotionDiv from '@/app/components/ui/MotionDiv';
import { Shield, Lock, Eye, UserCheck, Database, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'When you interact with Bright Link School through our website, we may collect certain information to provide better services and communication.',
        'Personal information such as student names, parent contact details, email addresses, and phone numbers are collected through admission forms, contact forms, and feedback submissions.',
        'We collect this information only when voluntarily provided by you through our online forms. We do not collect information through cookies or tracking technologies.',
      ],
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'The information we collect is used solely for educational and administrative purposes related to Bright Link School.',
        'Student admission applications are processed to evaluate eligibility and communicate admission decisions. Contact form submissions help us respond to inquiries and provide information about our school.',
        'Parent feedback is used to improve our services and understand community needs. We may use contact information to send important school updates, event notifications, and academic information.',
        'We do not sell, rent, or share your personal information with third parties for marketing purposes.',
      ],
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'We take the security of your personal information seriously and implement appropriate technical measures to protect it from unauthorized access, alteration, or disclosure.',
        'Our website uses secure connections for data transmission. Uploaded documents such as student photos and birth certificates are stored securely using Cloudinary, a trusted cloud storage service.',
        'Access to student and parent information is restricted to authorized school staff only. We maintain records only as long as necessary for educational purposes and legal requirements.',
      ],
    },
    {
      icon: Eye,
      title: 'Your Rights',
      content: [
        'You have the right to access, update, or request deletion of your personal information stored in our system.',
        'Parents can request to view their submitted admission applications or update contact details by contacting our administration office.',
        'If you have submitted feedback or contact information and wish to have it removed, please contact us directly.',
        'You may choose to opt out of receiving school updates and notifications, though we recommend staying informed about important school matters.',
      ],
    },
    {
      icon: UserCheck,
      title: "Children's Privacy",
      content: [
        'Bright Link School is committed to protecting the privacy of children. We only collect information about students with explicit consent from parents or guardians through our admission process.',
        'Student photos and personal information are never publicly displayed on our website without parental consent.',
        'We educate our students about online safety and responsible internet use as part of our digital literacy program.',
      ],
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: [
        'If you have questions about this privacy policy or how we handle your information, please contact us:',
        'Email: info@brightlinkschool.edu.pk',
        'Phone: +92 300 0811056',
        'Address: Khuhra, Tehsil Gambat, District Khairpur, Sindh',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Last Updated */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> July 2026
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to Bright Link Public High School. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website or interact with our school.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website and submitting information through our forms, you agree to the practices described in this policy. We are committed to maintaining the trust and confidence of our school community.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Changes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-xl p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will update the &quot;Last Updated&quot; date at the top of this page.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We encourage you to review this policy periodically. Your continued use of our website after changes have been posted constitutes your acceptance of the updated policy.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Questions About Your Privacy?</h2>
            <p className="text-blue-100 mb-8">
              If you have any concerns or questions about how we handle your information, please don&apos;t hesitate to reach out to us.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300"
            >
              Contact Us
            </a>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
