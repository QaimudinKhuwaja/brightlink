import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        uploadDate: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch gallery images',
      },
      { status: 500 }
    );
  }
}
