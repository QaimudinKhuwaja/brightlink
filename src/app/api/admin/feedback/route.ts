import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

// GET - Fetch all feedback
export async function GET() {
  try {
    await requireAuth();

    const feedback = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error('Fetch feedback error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch feedback',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update feedback (approve, publish, etc.)
export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Feedback ID is required',
        },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Feedback updated successfully',
      data: feedback,
    });
  } catch (error) {
    console.error('Update feedback error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update feedback',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete feedback
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Feedback ID is required',
        },
        { status: 400 }
      );
    }

    await prisma.feedback.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Feedback deleted successfully',
    });
  } catch (error) {
    console.error('Delete feedback error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete feedback',
      },
      { status: 500 }
    );
  }
}
