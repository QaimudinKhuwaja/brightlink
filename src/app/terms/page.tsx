'use client';

import MotionDiv from '@/app/components/ui/MotionDiv';
import { FileText, AlertCircle, CheckCircle, XCircle, Scale, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using the Bright Link Public High School website, you accept and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.',
        'These terms apply to all visitors, users, and others who access or use our website. We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of those changes.',
      ],
    },
    {
      icon: FileText,
      title: 'Use of Website',
      content: [
        'This website is intended to provide information about Bright Link School, our academic programs, facilities, and admission process. You may use our website for lawful purposes only.',
        'You agree not to use the website in any way that could damage, disable, overburden, or impair the website or interfere with any other party\'s use of the website.',
        'You may not attempt to gain unauthorized access to any portion of the website, other accounts, computer systems, or networks connected to the website through hacking, password mining, or any other means.',
      ],
    },
    {
      icon: Shield,
      title: 'Admission Applications',
      content: [
        'Submission of an admission application through our website does not guarantee acceptance into Bright Link School. All applications are reviewed based on our admission criteria and available capacity.',
        'You agree to provide accurate, current, and complete information during the admission application process. Providing false or misleading information may result in rejection of the application or dismissal from the school if discovered after enrollment.',
        'Application fees, if applicable, are non-refundable. Admission decisions made by the school administration are final and not subject to appeal through this website.',
        'Parents and guardians are responsible for ensuring all required documents are submitted within the specified timeframe.',
      ],
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: [
        'All content on this website, including text, images, graphics, logos, and software, is the property of Bright Link Public High School or its content suppliers and is protected by copyright and intellectual property laws.',
        'You may view and download content from this website for personal, non-commercial use only. You may not modify, reproduce, distribute, or use any content from this website for commercial purposes without our written permission.',
        'The Bright Link School name and logo are trademarks of our institution. You may not use these marks without our prior written consent.',
      ],
    },
    {
      icon: AlertCircle,
      title: 'User-Generated Content',
      content: [
        'When you submit feedback, contact messages, or any other content through our website forms, you grant Bright Link School the right to use, reproduce, and display that content for internal purposes and school improvement.',
        'You are solely responsible for the content you submit. You agree not to submit content that is unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable.',
        'We reserve the right to remove any user-submitted content that violates these terms or that we deem inappropriate, without prior notice.',
      ],
    },
    {
      icon: XCircle,
      title: 'Disclaimer of Warranties',
      content: [
        'This website and all information, content, and materials included on or otherwise made available through this website are provided on an "as is" and "as available" basis.',
        'While we strive to provide accurate and up-to-date information about our school, programs, and admission process, we make no warranties or representations about the accuracy, reliability, or completeness of the information.',
        'Bright Link School does not warrant that the website will be uninterrupted, secure, or error-free. We are not responsible for any technical issues, data loss, or damage that may occur from using our website.',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Limitation of Liability',
      content: [
        'To the fullest extent permitted by law, Bright Link Public High School shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the website.',
        'This includes, but is not limited to, damages for loss of data, loss of profits, or other intangible losses, even if we have been advised of the possibility of such damages.',
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
            <FileText className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Please read these terms carefully before using our website
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
              <strong>Effective Date:</strong> July 2026
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
              Welcome to the Bright Link Public High School website. These Terms of Service govern your use of our website and the services we provide through it.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read these terms carefully. By using our website, you acknowledge that you have read, understood, and agree to be bound by these terms. If you have any questions about these terms, please contact us before using the website.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Additional Terms */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-8">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">External Links</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may contain links to third-party websites, including our social media pages. These links are provided for your convenience only. We do not control these external sites and are not responsible for their content, privacy policies, or practices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Accessing external links is at your own risk. We encourage you to read the terms and privacy policies of any third-party websites you visit.
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service are governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in Khairpur, Sindh.
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Bright Link Public High School</strong></p>
                <p>Khuhra, Tehsil Gambat, District Khairpur, Sindh</p>
                <p>Phone: +92 300 0811056</p>
                <p>Email: info@brightlinkschool.edu.pk</p>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. We will update the &quot;Effective Date&quot; at the top of this page when changes are made.
              </p>
              <p className="text-gray-700 leading-relaxed">
                It is your responsibility to review these terms periodically. Your continued use of the website after changes have been posted constitutes your acceptance of the modified terms.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Agreement Notice */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-3xl font-bold text-white mb-4">Your Agreement</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              By using the Bright Link School website, you acknowledge that you have read these Terms of Service and agree to be bound by them. Thank you for being part of our school community.
            </p>
            <a
              href="/"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300"
            >
              Return to Home
            </a>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
