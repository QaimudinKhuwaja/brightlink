import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const faculty = await prisma.faculty.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    console.error('Faculty fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch faculty',
      },
      { status: 500 }
    );
  }
}
