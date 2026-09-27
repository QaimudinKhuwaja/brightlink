import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { feedbackSchema } from '@/lib/validations/feedback';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = feedbackSchema.parse(body);

    const feedback = await prisma.feedback.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your feedback!',
        data: feedback,
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

    console.error('Feedback submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit feedback. Please try again.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error('Feedback fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch feedback',
      },
      { status: 500 }
    );
  }
}
