import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSuperAdmin, hashPassword } from '@/lib/auth';
import { createAdminSchema, updateAdminSchema, resetPasswordSchema } from '@/lib/validations/admin';
import { z } from 'zod';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

// GET - Fetch all admins (Super Admin only)
export async function GET() {
  try {
    await requireSuperAdmin();

    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: admins,
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

    console.error('Fetch admins error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch admins',
      },
      { status: 500 }
    );
  }
}

// POST - Create new admin (Super Admin only)
export async function POST(request: NextRequest) {
  try {
    await requireSuperAdmin();

    const body = await request.json();
    const validatedData = createAdminSchema.parse(body);

    // Check if username or email already exists
    const existing = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: validatedData.username },
          { email: validatedData.email },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: existing.username === validatedData.username
            ? 'Username already exists'
            : 'Email already exists',
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Admin created successfully',
        data: admin,
      },
      { status: 201 }
    );
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

    console.error('Create admin error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create admin',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update admin (Super Admin only)
export async function PATCH(request: NextRequest) {
  try {
    await requireSuperAdmin();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Admin ID is required',
        },
        { status: 400 }
      );
    }

    const validatedData = updateAdminSchema.parse(updateData);

    const admin = await prisma.admin.update({
      where: { id },
      data: validatedData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin updated successfully',
      data: admin,
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

    console.error('Update admin error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update admin',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete admin (Super Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const currentAdmin = await requireSuperAdmin();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Admin ID is required',
        },
        { status: 400 }
      );
    }

    // Prevent deleting yourself
    if (currentAdmin.id === id) {
      return NextResponse.json(
        {
          success: false,
          message: 'You cannot delete your own account',
        },
        { status: 400 }
      );
    }

    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin deleted successfully',
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

    console.error('Delete admin error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete admin',
      },
      { status: 500 }
    );
  }
}
