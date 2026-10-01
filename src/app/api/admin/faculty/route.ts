import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

const facultySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  role: z.string().min(2, 'Role is required').max(100),
  qualification: z.string().min(2, 'Qualification is required').max(200),
  experience: z.string().optional(),
  emoji: z.string().max(10).optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
  bio: z.string().max(500).optional(),
  isActive: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

// GET - Fetch all faculty
export async function GET() {
  try {
    await requireAuth();

    const faculty = await prisma.faculty.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    console.error('Fetch faculty error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch faculty',
      },
      { status: 500 }
    );
  }
}

// POST - Create new faculty
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const validatedData = facultySchema.parse(body);

    const faculty = await prisma.faculty.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Faculty member added successfully',
        data: faculty,
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

    console.error('Create faculty error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add faculty member',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update faculty
export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Faculty ID is required',
        },
        { status: 400 }
      );
    }

    const faculty = await prisma.faculty.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Faculty member updated successfully',
      data: faculty,
    });
  } catch (error) {
    console.error('Update faculty error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update faculty member',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete faculty
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Faculty ID is required',
        },
        { status: 400 }
      );
    }

    await prisma.faculty.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Faculty member deleted successfully',
    });
  } catch (error) {
    console.error('Delete faculty error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete faculty member',
      },
      { status: 500 }
    );
  }
}
