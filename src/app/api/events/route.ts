import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error('Events fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch events',
      },
      { status: 500 }
    );
  }
}
