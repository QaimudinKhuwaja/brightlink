import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations/contact';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    const contact = await prisma.contactMessage.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Contact submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again.',
      },
      { status: 500 }
    );
  }
}
