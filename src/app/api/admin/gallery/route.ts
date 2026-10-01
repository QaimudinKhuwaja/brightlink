import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// Force dynamic rendering - required for cookie-based authentication
export const dynamic = 'force-dynamic';

const createGallerySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required').max(100),
  imageUrl: z.string().url('Invalid image URL'),
});

// GET - Fetch all gallery images
export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { uploadDate: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error('Fetch gallery error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch gallery images',
      },
      { status: 500 }
    );
  }
}

// POST - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const validatedData = createGallerySchema.parse(body);

    const image = await prisma.galleryImage.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Image added successfully',
        data: image,
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

    console.error('Create gallery image error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add image',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update gallery image
export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Image ID is required',
        },
        { status: 400 }
      );
    }

    const image = await prisma.galleryImage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Image updated successfully',
      data: image,
    });
  } catch (error) {
    console.error('Update gallery image error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update image',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery image
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Image ID is required',
        },
        { status: 400 }
      );
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete image',
      },
      { status: 500 }
    );
  }
}
