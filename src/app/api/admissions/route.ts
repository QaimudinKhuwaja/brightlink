import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { admissionApiSchema } from '@/lib/validations/admission';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input (including file URLs)
    const validatedData = admissionApiSchema.parse(body);

    // Convert date strings to Date objects
    const admission = await prisma.admission.create({
      data: {
        ...validatedData,
        dateOfBirth: new Date(validatedData.dateOfBirth),
        admissionDate: new Date(validatedData.admissionDate),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Admission application submitted successfully!',
        data: admission,
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

    console.error('Admission submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit admission application. Please try again.',
      },
      { status: 500 }
    );
  }
}
