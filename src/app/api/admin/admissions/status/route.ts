import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message: 'ID and status are required',
        },
        { status: 400 }
      );
    }

    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid status value',
        },
        { status: 400 }
      );
    }

    const admission = await prisma.admission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: `Admission ${status.toLowerCase()} successfully`,
      data: admission,
    });
  } catch (error) {
    console.error('Update admission status error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update admission status',
      },
      { status: 500 }
    );
  }
}
