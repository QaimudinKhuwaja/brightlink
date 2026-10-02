import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

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

    const admission = await prisma.admission.findUnique({
      where: { id },
    });

    if (!admission) {
      return NextResponse.json(
        { success: false, message: 'Admission not found' },
        { status: 404 }
      );
    }

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    };

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = 800;

    // Header
    page.drawText('BRIGHTLINK PUBLIC SCHOOL', {
      x: 50,
      y,
      size: 20,
      font: fontBold,
      color: rgb(0.12, 0.25, 0.69),
    });
    y -= 20;
    page.drawText('Khuhra, Tehsil Gambat, District Khairpur', {
      x: 50,
      y,
      size: 10,
      font,
      color: rgb(0.42, 0.45, 0.50),
    });
    y -= 30;

    // Title
    page.drawText('ADMISSION FORM', {
      x: 220,
      y,
      size: 16,
      font: fontBold,
      color: rgb(0.12, 0.16, 0.22),
    });
    y -= 40;

    // Student Information
    page.drawRectangle({ x: 40, y: y - 20, width: 515, height: 25, color: rgb(0.95, 0.96, 0.96) });
    page.drawText('STUDENT INFORMATION', { x: 46, y: y - 15, size: 13, font: fontBold });
    y -= 40;

    page.drawText('Full Name', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.studentName, { x: 40, y: y - 12, size: 10, font });
    page.drawText("Father's Name", { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.fatherName, { x: 300, y: y - 12, size: 10, font });
    y -= 35;

    page.drawText('Gender', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.gender, { x: 40, y: y - 12, size: 10, font });
    page.drawText('Date of Birth', { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(formatDate(admission.dateOfBirth), { x: 300, y: y - 12, size: 10, font });
    y -= 35;

    page.drawText('B-Form Number', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.bFormNumber, { x: 40, y: y - 12, size: 10, font });
    page.drawText('Previous School', { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.previousSchool || 'N/A', { x: 300, y: y - 12, size: 10, font });
    y -= 45;

    // Parent Information
    page.drawRectangle({ x: 40, y: y - 20, width: 515, height: 25, color: rgb(0.95, 0.96, 0.96) });
    page.drawText('PARENT/GUARDIAN INFORMATION', { x: 46, y: y - 15, size: 13, font: fontBold });
    y -= 40;

    page.drawText('Parent/Guardian Name', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.parentName, { x: 40, y: y - 12, size: 10, font });
    page.drawText('Contact Number', { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.phone, { x: 300, y: y - 12, size: 10, font });
    y -= 35;

    page.drawText('WhatsApp Number', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.whatsapp, { x: 40, y: y - 12, size: 10, font });
    page.drawText('Email Address', { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.email || 'N/A', { x: 300, y: y - 12, size: 10, font });
    y -= 45;

    // Address Information
    page.drawRectangle({ x: 40, y: y - 20, width: 515, height: 25, color: rgb(0.95, 0.96, 0.96) });
    page.drawText('ADDRESS INFORMATION', { x: 46, y: y - 15, size: 13, font: fontBold });
    y -= 40;

    page.drawText('City', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.city, { x: 40, y: y - 12, size: 10, font });
    page.drawText('Area', { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.area, { x: 300, y: y - 12, size: 10, font });
    y -= 35;

    page.drawText('Complete Address', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.completeAddress, { x: 40, y: y - 12, size: 10, font });
    y -= 45;

    // Admission Details
    page.drawRectangle({ x: 40, y: y - 20, width: 515, height: 25, color: rgb(0.95, 0.96, 0.96) });
    page.drawText('ADMISSION DETAILS', { x: 46, y: y - 15, size: 13, font: fontBold });
    y -= 40;

    page.drawText('Applying for Class', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.applyingClass, { x: 40, y: y - 12, size: 10, font });
    page.drawText('Session', { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(admission.session, { x: 300, y: y - 12, size: 10, font });
    y -= 35;

    page.drawText('Application Date', { x: 40, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(formatDate(admission.createdAt), { x: 40, y: y - 12, size: 10, font });
    page.drawText('Admission Date', { x: 300, y, size: 9, font, color: rgb(0.42, 0.45, 0.50) });
    page.drawText(formatDate(admission.admissionDate), { x: 300, y: y - 12, size: 10, font });
    y -= 50;

    // Office Use Only Box
    page.drawRectangle({ x: 40, y: y - 80, width: 515, height: 80, color: rgb(1, 0.95, 0.78), borderColor: rgb(0.82, 0.84, 0.86), borderWidth: 1 });
    page.drawText('FOR OFFICE USE ONLY', { x: 46, y: y - 20, size: 12, font: fontBold, color: rgb(0.57, 0.25, 0.05) });
    page.drawText('Status: ' + admission.status, { x: 46, y: y - 50, size: 10, font });
    y -= 100;

    // Footer
    page.drawText('This is a computer-generated admission form for BrightLink Public School', { x: 100, y: 40, size: 8, font, color: rgb(0.61, 0.64, 0.69) });
    page.drawText('For queries, contact: +92 300 0811056 | Email: info@brightlinkschool.edu.pk', { x: 80, y: 25, size: 8, font, color: rgb(0.61, 0.64, 0.69) });

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="admission-form-${admission.studentName.replace(/\s+/g, '-')}-${id.slice(0, 8)}.pdf"`,
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
