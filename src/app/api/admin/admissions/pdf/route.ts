import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import PDFDocument from 'pdfkit';

// Force this route to use Node.js runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Admission ID is required' },
        { status: 400 }
      );
    }

    // Fetch admission data
    const admission = await prisma.admission.findUnique({
      where: { id },
    });

    if (!admission) {
      return NextResponse.json(
        { success: false, message: 'Admission not found' },
        { status: 404 }
      );
    }

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 40, left: 40, right: 40 },
    });

    // Collect PDF chunks
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    // Format date helper
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    };

    // Header with school name
    doc
      .fontSize(20)
      .fillColor('#1e40af')
      .text('BRIGHTLINK PUBLIC SCHOOL', { align: 'center' })
      .fontSize(10)
      .fillColor('#6b7280')
      .text('Khuhra, Tehsil Gambat, District Khairpur', { align: 'center' })
      .moveDown(0.5);

    // Add blue line
    doc
      .moveTo(40, doc.y)
      .lineTo(555, doc.y)
      .strokeColor('#2563eb')
      .lineWidth(2)
      .stroke()
      .moveDown(1);

    // Form Title
    doc
      .fontSize(16)
      .fillColor('#1f2937')
      .text('ADMISSION FORM', { align: 'center', underline: true })
      .moveDown(1);

    // Helper function for section headers
    const addSectionHeader = (title: string) => {
      doc
        .fontSize(13)
        .fillColor('#374151')
        .fillAndStroke('#f3f4f6', '#f3f4f6')
        .rect(40, doc.y, 515, 25)
        .fill()
        .fillColor('#374151')
        .text(title, 46, doc.y - 19)
        .moveDown(0.5);
    };

    // Helper function for field rows
    const addFieldRow = (label: string, value: string) => {
      const y = doc.y;
      doc
        .fontSize(9)
        .fillColor('#6b7280')
        .text(label, 40, y)
        .fontSize(10)
        .fillColor('#1f2937')
        .text(value || 'N/A', 40, y + 12, {
          width: 250,
        })
        .moveDown(1);
    };

    const addTwoColumnRow = (label1: string, value1: string, label2: string, value2: string) => {
      const y = doc.y;

      // Left column
      doc
        .fontSize(9)
        .fillColor('#6b7280')
        .text(label1, 40, y)
        .fontSize(10)
        .fillColor('#1f2937')
        .text(value1 || 'N/A', 40, y + 12, { width: 240 });

      // Right column
      doc
        .fontSize(9)
        .fillColor('#6b7280')
        .text(label2, 300, y)
        .fontSize(10)
        .fillColor('#1f2937')
        .text(value2 || 'N/A', 300, y + 12, { width: 240 });

      doc.moveDown(1.5);
    };

    // Student Information Section
    addSectionHeader('STUDENT INFORMATION');
    addTwoColumnRow('Full Name', admission.studentName, "Father's Name", admission.fatherName);
    addTwoColumnRow('Gender', admission.gender, 'Date of Birth', formatDate(admission.dateOfBirth));
    addTwoColumnRow('B-Form Number', admission.bFormNumber, 'Previous School', admission.previousSchool || 'N/A');
    doc.moveDown(0.5);

    // Parent/Guardian Information Section
    addSectionHeader('PARENT/GUARDIAN INFORMATION');
    addTwoColumnRow('Parent/Guardian Name', admission.parentName, 'Contact Number', admission.phone);
    addTwoColumnRow('WhatsApp Number', admission.whatsapp, 'Email Address', admission.email || 'N/A');
    doc.moveDown(0.5);

    // Address Information Section
    addSectionHeader('ADDRESS INFORMATION');
    addTwoColumnRow('City', admission.city, 'Area', admission.area);
    addFieldRow('Complete Address', admission.completeAddress);
    doc.moveDown(0.5);

    // Admission Details Section
    addSectionHeader('ADMISSION DETAILS');
    addTwoColumnRow('Applying for Class', admission.applyingClass, 'Session', admission.session);
    addTwoColumnRow('Application Date', formatDate(admission.createdAt), 'Admission Date', formatDate(admission.admissionDate));
    doc.moveDown(1);

    // For Office Use Only Box
    doc
      .fillAndStroke('#fef3c7', '#d1d5db')
      .rect(40, doc.y, 515, 80)
      .fill()
      .stroke();

    const officeY = doc.y + 10;
    doc
      .fontSize(12)
      .fillColor('#92400e')
      .text('FOR OFFICE USE ONLY', 46, officeY);

    doc.moveDown(0.8);
    addTwoColumnRow('Registration Number', '____________________', 'Status', admission.status);
    addTwoColumnRow('Verified By', '____________________', 'Signature', '____________________');

    // Footer
    doc.moveDown(2);
    doc
      .moveTo(40, doc.y)
      .lineTo(555, doc.y)
      .strokeColor('#d1d5db')
      .lineWidth(1)
      .stroke();

    doc.moveDown(0.5);
    doc
      .fontSize(8)
      .fillColor('#9ca3af')
      .text('This is a computer-generated admission form for BrightLink Public School', { align: 'center' })
      .text('For queries, contact: +92 300 0811056 | Email: info@brightlinkschool.edu.pk', { align: 'center' });

    // Finalize PDF
    doc.end();

    // Wait for PDF to finish
    await new Promise<void>((resolve) => {
      doc.on('end', () => resolve());
    });

    // Combine chunks into buffer
    const pdfBuffer = Buffer.concat(chunks);

    // Return PDF response
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="admission-form-${admission.studentName.replace(/\s+/g, '-')}-${id.slice(0, 8)}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate PDF',
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
