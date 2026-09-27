import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

// GET - Fetch all admissions with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { studentName: { contains: search, mode: 'insensitive' } },
        { fatherName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.admission.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: admissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Fetch admissions error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch admissions',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete an admission
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Admission ID is required',
        },
        { status: 400 }
      );
    }

    await prisma.admission.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Admission deleted successfully',
    });
  } catch (error) {
    console.error('Delete admission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete admission',
      },
      { status: 500 }
    );
  }
}
