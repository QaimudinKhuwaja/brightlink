import { NextRequest, NextResponse } from 'next/server';
import { requireSuperAdmin, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

const resetPasswordSchema = z.object({
  id: z.string().min(1, 'Admin ID is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(request: NextRequest) {
  try {
    await requireSuperAdmin();

    const body = await request.json();
    const { id, password } = resetPasswordSchema.parse(body);

    const hashedPassword = await hashPassword(password);

    await prisma.admin.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Access denied. Super Admin privileges required.',
        },
        { status: 403 }
      );
    }

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

    console.error('Reset password error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to reset password',
      },
      { status: 500 }
    );
  }
}
